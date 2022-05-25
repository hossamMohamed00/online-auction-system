import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateComplaintDto {
	@IsNotEmpty()
	@IsString()
	reason: string;
	@IsNotEmpty()
	@IsMongoId()
	in: ObjectId;
}
