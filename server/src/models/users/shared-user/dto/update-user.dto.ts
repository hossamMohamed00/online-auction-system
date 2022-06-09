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
	// @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
	// 	message: 'Password is too weak (MUST: 1L, 1N, 1S)😢',
	// })
	// @MinLength(8)
	@MinLength(3)
	password: string;

	@IsOptional()
	@Length(11)
	phoneNumber: any;

	@IsOptional()
	@IsString()
	address: string;

	@IsOptional()
	@IsFile()
	@MaxFileSize(1e6)
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	image: any;
}
