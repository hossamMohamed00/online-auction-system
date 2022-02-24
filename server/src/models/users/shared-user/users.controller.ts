import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { UpdateUserDto, UserDto } from './dto';
import { Role } from './enums';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';

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
  findOne(@Param() { id }: MongoObjectIdDto) {
    return this.usersService.findById(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param() { id }: MongoObjectIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param() { id }: MongoObjectIdDto) {
    return this.usersService.remove(id);
  }
}
