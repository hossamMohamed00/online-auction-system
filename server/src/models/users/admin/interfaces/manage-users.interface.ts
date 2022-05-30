/*
 ? This interface include all functions related to all users
 */

import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { ResponseResult } from 'src/common/types';
import { FilterUsersQueryDto } from '../../shared-user/dto/filter-users.dto';
import { User, UserDocument } from '../../shared-user/schema/user.schema';
import { AdminBlockUserDto, AdminWarnUserDto } from '../dto';

export interface AdminUsersBehaviors {
	//* Return all registered users
	findAllSystemUsers(filterUsersQueryDto: FilterUsersQueryDto): Promise<User[]>;

	//* Warn user and provide warning message
	warnUser(
		{ id: userId }: MongoObjectIdDto,
		adminWarnUserDto: AdminWarnUserDto,
	): Promise<ResponseResult>;

	//* Block user and provide block reason
	blockUser(
		{ id: userId }: MongoObjectIdDto,
		adminBlockUserDto: AdminBlockUserDto,
	): Promise<ResponseResult>;
}
