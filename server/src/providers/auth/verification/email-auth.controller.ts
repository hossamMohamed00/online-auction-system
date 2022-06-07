import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import { ConfirmEmailDto, ResendVerificationCodeDto } from './dto';
import { EmailAuthService } from './email-auth.service';

@Controller('email-confirmation')
export class EmailAuthController {
	constructor(
		private readonly emailConfirmationService: EmailAuthService,
	) {}

	@IsPublicRoute()
	@HttpCode(HttpStatus.OK)
	@Post('confirm')
	async confirm(@Body() { verificationCode, email }: ConfirmEmailDto) {
		//* Confirm the email
		return await this.emailConfirmationService.confirmEmailVerificationCode(
			email,
			verificationCode,
		);
	}

	@IsPublicRoute()
	@HttpCode(HttpStatus.OK)
	@Post('resend-confirmation-link')
	async resendConfirmationCode(@Body() { email }: ResendVerificationCodeDto) {
		return await this.emailConfirmationService.resendConfirmationCode(email);
	}
}
