import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/guards/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({})
  async login(@Request() req) {
    console.log(req.user._doc);
    const access_token = await this.authService.login(req.user._doc);
    console.log('Token', access_token);

    return access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiHeader({ name: 'Authorization' })
  getProfile(@Request() req) {
    return req.user;
  }
}
