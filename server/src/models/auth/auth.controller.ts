import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './auth.service';
import {
	GetCurrentUserData,
	GetRefreshToken,
	IsPublicRoute,
} from 'src/common/decorators';
import { RefreshTokenAuthGuard } from '../../common/guards';
import { TokensAndRole } from './types';
import { Serialize } from 'src/common/interceptors';
import { UserDto } from '../users/shared-user/dto';
import { EmailConfirmationService } from 'src/providers/auth';

/**
 * These endpoints responsible for user authentication
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	/**
	 * Register a new user
	 * @param registerUserDto :RegisterUserDto
	 * @returns Tokens object containing access_token and refresh_token
	 */
	@IsPublicRoute()
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(
		@Body() registerUserDto: RegisterUserDto,
	): Promise<TokensAndRole> {
		//? Register the user
		const tokens = await this.authService.register(registerUserDto);

		//? Send confirmation email
		await this.emailConfirmationService.sendVerificationCode(
			registerUserDto.name,
			registerUserDto.email,
		);

		return tokens;
	}

	/**
	 * Login user with email and password
	 * @param loginDto :LoginDto
	 * @returns Tokens object containing access_token and refresh_token
	 */
	@IsPublicRoute()
	@ApiBody({})
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() loginDto: LoginUserDto): Promise<TokensAndRole> {
		return this.authService.login(loginDto);
	}

	/**
	 * Get the current logged in user data
	 * @param req
	 * @returns
	 */
	@ApiHeader({ name: 'Authorization' })
	@HttpCode(HttpStatus.OK)
	@Serialize(UserDto)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	/**
	 * Logout user
	 */
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	logout(@GetCurrentUserData('_id') userId: string) {
		return this.authService.logout(userId);
	}

	/*
  ?  Issue new tokens if the given refresh-token is valid
  */
	@IsPublicRoute() //* Bypass AccessTokenAuthGuard
	@UseGuards(RefreshTokenAuthGuard) //* Ensure that the refresh token is exists
	@HttpCode(HttpStatus.OK)
	@ApiHeader({ name: 'authorization', description: 'Refresh Token' })
	@Post('refresh-token')
	refreshToken(
		@GetCurrentUserData('_id') userId: string,
		@GetRefreshToken() refreshToken: string,
	) {
		return this.authService.getNewRefreshToken(userId, refreshToken);
	}
}
