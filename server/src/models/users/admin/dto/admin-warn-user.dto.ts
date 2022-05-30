import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AdminWarnUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(255)
	warningMessage: string;

	//* TODO: Create new warning messages enum
}