import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class ConfirmEmailDto {
	@IsNumber()
	@IsNotEmpty()
	verificationCode: number;

	@IsEmail()
	@IsNotEmpty()
	email: string;
}

export default ConfirmEmailDto;
