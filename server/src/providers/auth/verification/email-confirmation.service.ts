import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from 'src/config/auth/auth.config.service';
import EmailService from 'src/providers/mail/email.service';
import { getEmailContent } from './content';
import VerificationTokenPayload from './verificationTokenPayload.interface';

@Injectable()
export class EmailConfirmationService {
	//* Inject required services
	constructor(
		private readonly jwtService: JwtService,
		private readonly authConfigService: AuthConfigService,
		private readonly emailService: EmailService,
	) {}

	/**
	 * Send confirmation link to user email to confirm this email address
	 * @param name: Name of the user
	 * @param email: Email address of the user to send verification link
	 */
	public sendVerificationLink(name: string, email: string) {
		//* Prepare the jwt payload
		const payload: VerificationTokenPayload = { email };

		//? Issue new verification token
		const token = this.jwtService.sign(payload, {
			secret: this.authConfigService.jwtVerificationTokenSecret,
			expiresIn: `${this.authConfigService.jwtVerificationTokenExpirationTime}s`,
		});

		//? Prepare the url
		const url = `${this.authConfigService.emailConfirmationUrl}?token=${token}`;

		//? Get the email content
		const emailText = getEmailContent(name, url);

		//? Send the verification link
		return this.emailService.sendMail({
			to: email,
			subject: 'Email confirmation 👌🏻🧐',
			text: emailText,
		});
	}
}
