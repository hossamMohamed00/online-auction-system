import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublicRoute, Roles } from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { FindUserDto, UpdateUserDto, UserDto } from './dto';
import { Role } from './enums';

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

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param() params: FindUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param() params: FindUserDto) {
    return this.usersService.remove(params.id);
  }
}
