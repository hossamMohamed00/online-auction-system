import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateComplaintDto {
	@IsNotEmpty()
	@IsString()
	reason: string;
	@IsNotEmpty()
	@IsEmail()
	in: string;
}
