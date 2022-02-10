import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthService } from './users/auth/auth.service';
import { JwtAuthGuard } from './users/auth/strategies/guards/jwt-auth.guard';
import { LocalAuthGuard } from './users/auth/strategies/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({})
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiHeader({ name: 'Authorization' })
  getProfile(@Request() req) {
    return req.user;
  }
}
