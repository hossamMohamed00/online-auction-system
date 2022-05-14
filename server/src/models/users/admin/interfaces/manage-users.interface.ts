/*
 ? This interface include all functions related to all users
 */

import { FilterUsersQueryDto } from '../../shared-user/dto/filter-users.dto';
import { User, UserDocument } from '../../shared-user/schema/user.schema';

export interface UsersBehaviors {
	findAllSystemUsers(filterUsersQueryDto: FilterUsersQueryDto): Promise<User[]>;
}
