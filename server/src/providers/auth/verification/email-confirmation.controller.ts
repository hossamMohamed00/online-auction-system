import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetCurrentUserData, IsPublicRoute } from 'src/common/decorators';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	@IsPublicRoute()
	@HttpCode(HttpStatus.OK)
	@Post('confirm')
	async confirm(@Body() { verificationCode, email }: ConfirmEmailDto) {
		//* Confirm the email
		return await this.emailConfirmationService.confirmCode(
			email,
			verificationCode,
		);
	}

	@HttpCode(HttpStatus.OK)
	@Post('resend-confirmation-link')
	async resendConfirmationCode(@GetCurrentUserData('_id') userId: string) {
		return await this.emailConfirmationService.resendConfirmationCode(userId);
	}
}
