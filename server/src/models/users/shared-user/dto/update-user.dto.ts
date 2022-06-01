import { string } from '@hapi/joi';
import {
	IsEmail,
	IsEnum,
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
	@IsNotEmpty()
	@MinLength(3)
	password: string;

	@IsFile()
	@MaxFileSize(1e6)
	@IsOptional()
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	// image: MemoryStoredFile;
	image: any;

	@IsOptional()
	@Length(11)
	phoneNumber: Number;
	@IsString()
	@IsOptional()
	address: string;
}
