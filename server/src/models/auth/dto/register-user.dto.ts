import {
	IsEmail,
	IsEnum,
	IsMobilePhone,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	Matches,
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

	@IsEnum(AvailableRolesForRegister, {
		message: 'Role must be either seller or buyer 🙂',
	})
	role: AvailableRolesForRegister;
	@IsOptional()
	@IsFile()
	@MaxFileSize(1e6)
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	// image: MemoryStoredFile;
	image: any;
	@IsNotEmpty()
	@Length(14)
	nationalID: Number;

	@IsOptional()
	@Length(11)
	phoneNumber: Number;
	@IsString()
	@IsOptional()
	address: string;
}
