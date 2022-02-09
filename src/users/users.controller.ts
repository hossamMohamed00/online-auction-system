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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { FindUserDto } from './dto/find-user.dto';

@ApiTags('User')
@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindUserDto) {
    return this.usersService.findOne(params.id);
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
