import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from 'src/config/auth/auth.config.service';
import { UsersService } from 'src/models/users/shared-user/users.service';
import EmailService from 'src/providers/mail/email.service';
import { getEmailContent } from './content';
import VerificationTokenPayload from './verificationTokenPayload.interface';

@Injectable()
export class EmailConfirmationService {
	private logger: Logger = new Logger('EmailConfirmationService 📨👌🏻');

	//* Inject required services
	constructor(
		private readonly jwtService: JwtService,
		private readonly authConfigService: AuthConfigService,
		private readonly emailService: EmailService,
		private readonly usersService: UsersService,
	) {}

	/**
	 * Send confirmation link to user email to confirm this email address
	 * @param name: Name of the user
	 * @param email: Email address of the user to send verification link
	 */
	async sendVerificationLink(name: string, email: string) {
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
		const emailStatus: boolean = await this.emailService.sendMail({
			to: email,
			subject: 'Online-Auction-System: Email confirmation 👌🏻🧐',
			html: emailText,
		});

		if (emailStatus) {
			this.logger.log('Verification link sent to user 📨❤');
		} else {
			this.logger.log('Cannot sent verification link right now ❌😢');
		}

		return;
	}

	async confirmEmail(email: string) {
		//? Check if the email address is already confirmed
		const user = await this.usersService.findByEmail(email);
		if (user && user.isEmailConfirmed) {
			this.logger.error('Email is already confirmed 🙂');
			throw new BadRequestException('Email already confirmed 🙄');
		}

		//? Otherwise, confirm the email address
		await this.usersService.markEmailAsConfirmed(email);

		this.logger.log('Email confirmed successfully 😍');
	}

	/**
	 * Decode token and get user email
	 * @param token - The token for the verification
	 * @returns email if found, otherwise throw error
	 */
	async decodeConfirmationToken(token: string): Promise<string> {
		try {
			//* Decode the token and get the payload
			const payload: VerificationTokenPayload = await this.jwtService.verify(
				token,
				{
					secret: this.authConfigService.jwtVerificationTokenSecret,
				},
			);

			//* Ensure that the email field in the payload
			if (typeof payload === 'object' && 'email' in payload) {
				//? return the user email
				return payload.email;
			}

			//! Otherwise, throw an error
			throw new BadRequestException();
		} catch (error) {
			//? If the error is 'TokenExpiredError', so throw bad request exception with proper message
			if (error?.name === 'TokenExpiredError') {
				throw new BadRequestException('Email confirmation token expired 😑');
			}
			//? Else, throw generic error
			throw new BadRequestException('Bad confirmation token');
		}
	}
}
