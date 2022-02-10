import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterUserDto } from '../dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Tokens } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user
   * @param registerUserDto :RegisterUserDto
   * @returns Tokens object containing access_token and refresh_token
   */
  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<Tokens> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiBody({})
  async login(@Body() loginDto: LoginDto): Promise<Tokens> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiHeader({ name: 'Authorization' })
  getProfile(@Request() req) {
    return req.user;
  }
}
