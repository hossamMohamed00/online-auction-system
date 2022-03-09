import { Body, Controller, Post } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
	) {}

	@IsPublicRoute()
	@Post('confirm')
	async confirm(@Body() confirmationData: ConfirmEmailDto) {
		//* Get the user email from the token
		const email = await this.emailConfirmationService.decodeConfirmationToken(
			confirmationData.token,
		);
		//* Confirm the email
		await this.emailConfirmationService.confirmEmail(email);
	}
}
