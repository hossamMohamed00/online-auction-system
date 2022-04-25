import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/shared-user/users.service';
import { JwtPayload } from './types/jwt-payload.type';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto, RegisterUserDto } from '../auth/dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tokens } from './types';
import { AuthConfigService } from 'src/config/auth/auth.config.service';
import { User, UserDocument } from '../users/shared-user/schema/user.schema';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly authConfigService: AuthConfigService,
	) {}

	private logger: Logger = new Logger('AuthService');

	/**
	 * Register new user
	 * @param registerUserDto
	 * @returns Tokens: Object of access_token and refresh_token
	 */
	async register(registerUserDto: RegisterUserDto): Promise<Tokens> {
		//* Ensure that the given email is not taken
		const isTaken = await this.usersService.findByEmail(registerUserDto.email);
		if (isTaken) throw new BadRequestException('Email already taken ❌👀');

		//? Create new user instance
		const createdUser: UserDocument = new this.usersModel(registerUserDto);

		//? Issue tokens, save refresh_token in db and save user
		const tokens = await this.getTokensAndSaveUser(createdUser);

		//* Return the tokens to the user
		return tokens;
	}

	/**
	 * Validate user credentials
	 * @param loginDto {email, password}: LoginDto
	 * @returns Tokens object contains access_token and refresh_token
	 */
	async login({ email, password }: LoginUserDto): Promise<Tokens> {
		//* Find the user
		const user: UserDocument = await this.usersService.findByEmail(email);
		if (!user) throw new NotFoundException('User not found ❌');

		//? Check if the password matches or not
		const isMatch = await compare(password, user.password);
		if (!isMatch) throw new NotFoundException('User not found ❌');

		//? Issue tokens, save refresh_token in db and save user
		const tokens = await this.getTokensAndSaveUser(user);

		return tokens;
	}

	/**
	 * Logout user
	 * @param _id - User id
	 */
	async logout(_id: string) {
		/*
   ? Find the user and set the refresh_token to null
   */
		await this.usersModel.findByIdAndUpdate(
			_id,
			{ refreshToken: null },
			{ new: true },
		);
	}

	/**
	 * Issue new tokens if the given refresh-token is valid
	 * @param _id - User id
	 * @param refreshToken - Given refresh-token
	 * @returns Tokens object contains access_token and refresh_token
	 */
	async getNewRefreshToken(_id: string, refreshToken: string): Promise<Tokens> {
		const user = await this.usersService.findById(_id);

		if (!user || !user.refreshToken)
			throw new ForbiddenException('Access Denied ❌');

		const isMatch = await compare(refreshToken, user.refreshToken);
		if (!isMatch) throw new ForbiddenException('Access Denied ❌');

		//? Issue tokens, save refresh_token in db and save user
		const tokens = await this.getTokensAndSaveUser(user);

		return tokens;
	}

	/* Utility functions */

	/**
	 * Issue new jwt token contains some user info for access_token and refresh_token
	 * @param Object contains userId (sub) and email
	 * @returns Object contains access_token and refreshToken
	 */
	async getJWTTokens({ sub, email }): Promise<Tokens> {
		//? Prepare the payload
		const payload: JwtPayload = { sub, email };

		//? Issue new accessToken, refreshToken
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.sign(payload, {
				secret: this.authConfigService.accessTokenSecret,
				expiresIn: this.authConfigService.accessTokenExpiration,
			}),

			this.jwtService.sign(payload, {
				secret: this.authConfigService.refreshTokenSecret,
				expiresIn: this.authConfigService.refreshTokenExpiration,
			}),
		]);

		return { accessToken, refreshToken };
	}

	async updateRefreshToken(user: UserDocument, refreshToken: string) {
		const hashedToken = await this.hashData(refreshToken);
		user.refreshToken = hashedToken;
	}

	/**
	 * Hash any string
	 * @param data
	 * @returns hashed data
	 */
	async hashData(data: string) {
		return hash(data, 12);
	}

	/**
	 * Issue new tokens and save refresh_token in db and save user instance
	 * @param user - User instance
	 * @returns Tokens object contains access_token and refresh_token
	 */
	async getTokensAndSaveUser(user: UserDocument): Promise<Tokens> {
		//? Issue jwt tokens
		const tokens = await this.getJWTTokens({
			sub: user._id,
			email: user.email,
		});

		//? Save the refreshToken in the db
		await this.updateRefreshToken(user, tokens.refreshToken);

		//* Save the user instance
		await user.save();

		return tokens;
	}

	/**
	 * Accept socket client and return access token
	 * @param client
	 * @returns access token if found
	 */
	async getJWTTokenFromSocketClient(client: Socket) {
		//* Extract the headers
		const handshakeHeaders = client.handshake.headers;

		//* Extract the access token
		let accessToken = handshakeHeaders.authorization;

		if (!accessToken) {
			return false;
		}

		// Extract the access token
		accessToken = accessToken.replace('Bearer', '').trim();

		return accessToken;
	}

	/**
	 * Get the user who owns the access token
	 * @param accessToken user access token
	 */
	async getUserFromJWT(accessToken: string): Promise<UserDocument> {
		/*
		 * First verify the token.
		 * Then, search for the user
		 * Finally, return the user
		 */
		try {
			//* verify token
			const payload: JwtPayload = await this.jwtService.verifyAsync(
				accessToken,
				{
					// Attach access token secret
					secret: this.authConfigService.accessTokenSecret,
				},
			);
			if (!payload) return null;

			//* Search for the user
			const user = await this.usersService.findById(payload.sub);
			if (!user) return null;

			//* Return the user
			return user;
		} catch (error) {
			//* An error occurred
			this.logger.log('Expired Token...❌');
			return null;
		}
	}
}
