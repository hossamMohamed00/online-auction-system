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
import { AvailableRolesForRegister } from 'src/models/users/shared-user/enums';

export class RegisterUserDto {
	@IsString()
	name = 'Anonymes';

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	password: string;

	@IsNotEmpty()
	@Length(14)
	nationalID: Number;

	@IsOptional()
	@Length(11)
	phoneNumber: Number;

	@IsString()
	@IsOptional()
	address: string;

	@IsOptional()
	@IsFile()
	@MaxFileSize(1e6)
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	image: any;

	@IsEnum(AvailableRolesForRegister, {
		message: 'Role must be either seller or buyer 🙂',
	})
	role: AvailableRolesForRegister;
}
