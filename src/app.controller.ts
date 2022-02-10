import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './users/dto/user.dto';

@Controller()
@Serialize(UserDto)
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiBody({})
  async login(@Request() req) {
    return req.user._doc;
  }
}
