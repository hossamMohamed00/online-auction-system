import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MinLength,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class UserUpdateDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	password: string;

	@IsOptional()
	@Length(11)
	phoneNumber: Number;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	@IsFile()
	@MaxFileSize(1e6)
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	image: any;
}
