import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/models/users/shared-user/enums';

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

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
