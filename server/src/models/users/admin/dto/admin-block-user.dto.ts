import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AdminBlockUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(5)
	@MaxLength(255)
	blockReason: string;

	//* TODO: Create new block messages enum
}