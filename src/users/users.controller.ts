import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { FindUserDto, RegisterUserDto, UpdateUserDto, UserDto } from './dto';

@ApiTags('User')
@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindUserDto) {
    return this.usersService.findById(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: FindUserDto) {
    return this.usersService.remove(params.id);
  }
}
