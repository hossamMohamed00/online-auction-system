import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from 'src/models/users/shared-user/schema/user.schema';

export class CreateComplaintDto {
	@IsNotEmpty()
	@IsString()
	reason: string;
	@IsNotEmpty()
	@IsMongoId()
	in: User;
}
