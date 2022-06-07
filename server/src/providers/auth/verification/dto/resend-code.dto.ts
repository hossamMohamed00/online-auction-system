import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class ResendVerificationCodeDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;
}

export default ResendVerificationCodeDto;
