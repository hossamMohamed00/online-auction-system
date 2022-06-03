import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MinLength,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class UserUpdateDto {
	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	@MinLength(3)
	password: string;

	@IsOptional()
	@Length(11)
	phoneNumber: Number;

	@IsString()
	@IsOptional()
	address: string;

	@IsFile()
	@MaxFileSize(1e6)
	@IsOptional()
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	image: any;
}
