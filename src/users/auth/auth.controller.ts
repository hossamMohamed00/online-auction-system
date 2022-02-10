import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request as HttpRequest } from 'express';
import { LoginUserDto, RegisterUserDto } from '../dto';
import { AuthService } from './auth.service';
import { AccessTokenAuthGuard, RefreshTokenAuthGuard } from './guards';
import { Tokens } from './types';

/**
 * These endpoints responsible for user authentication
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user
   * @param registerUserDto :RegisterUserDto
   * @returns Tokens object containing access_token and refresh_token
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() registerUserDto: RegisterUserDto): Promise<Tokens> {
    return this.authService.register(registerUserDto);
  }

  /**
   * Login user with email and password
   * @param loginDto :LoginDto
   * @returns Tokens object containing access_token and refresh_token
   */
  @Post('login')
  @ApiBody({})
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(loginDto);
  }

  /**
   * Get the current logged in user data
   * @param req
   * @returns
   */
  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  @ApiHeader({ name: 'Authorization' })
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Logout user
   */
  @UseGuards(AccessTokenAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: HttpRequest) {
    const user = req.user;
    return this.authService.logout(user['_id']);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken() {}
}
