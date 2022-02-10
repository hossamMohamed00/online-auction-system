import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { Serialize } from './interceptors/serialize.interceptor';
import { LocalAuthGuard } from './users/auth/strategies/local-auth.guard';
import { UserDto } from './users/dto/user.dto';

@Controller()
@Serialize(UserDto)
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({})
  async login(@Request() req) {
    return req.user._doc;
  }
}
