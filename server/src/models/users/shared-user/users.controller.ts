import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { UserDto } from './dto';
import { Role } from './enums';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionDto } from 'src/models/auction/dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
