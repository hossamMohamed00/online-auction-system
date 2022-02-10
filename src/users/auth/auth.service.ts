import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../entities/user.schema';
import { UsersService } from '../users.service';
import { JwtPayload } from './types/jwt-payload.type';
import { compare, hash } from 'bcryptjs';
import { RegisterUserDto } from '../dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tokens } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Register new user
   * @param registerUserDto
   * @returns Tokens: Object of access_token and refresh_token
   */
  async register(registerUserDto: RegisterUserDto): Promise<Tokens> {
    //? Create new user instance
    const createdUser = new this.usersModel(registerUserDto);

    //? Issue jwt tokens
    const tokens = await this.getJWTTokens({
      sub: createdUser._id,
      email: createdUser.email
    });

    //? Save the refreshToken in the db
    await this.updateRefreshToken(createdUser, tokens.refreshToken);

    //* Save the user instance
    await createdUser.save();

    //* Return the tokens to the user
    return tokens;
  }

  /**
   * Validate user credentials
   * @param email User email
   * @param password User password
   * @returns user instance if found || null if not found
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByEmail(email);
    //? Check if the password matches or not
    const isMatch = await compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

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
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: '50m'
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d'
      })
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
}
