import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseResult } from 'src/common/types';
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
		private readonly emailService: EmailService,
		private readonly usersService: UsersService,
	) {}

	/**
	 * Send confirmation link to user email to confirm this email address
	 * @param name: Name of the user
	 * @param email: Email address of the user to send verification link
	 */
	async sendVerificationCode(name: string, email: string) {
		//* Get 5 random numbers
		const verificationCode = this.generateVerificationCode();

		//* Save verification Code into user document
		await this.usersService.handleNewVerificationCode(email, verificationCode);

		//? Get the email content
		const emailText = getEmailContent(name, verificationCode);

		//? Send the verification code
		const emailStatus: boolean = await this.emailService.sendMail({
			to: email,
			subject: 'Online-Auction-System: Email confirmation 👌🏻🧐',
			html: emailText,
		});

		if (emailStatus) {
			this.logger.log('Verification link sent to user 📨❤');
			return true;
		} else {
			this.logger.log('Cannot sent verification link right now ❌😢');
			return false;
		}
	}

	/**
	 * Mark the user email as confirmed
	 * @param email - User email
	 */
	async confirmCode(
		email: string,
		verificationCode: number,
	): Promise<ResponseResult> {
		//* Get the user by email
		const user = await this.usersService.findByEmail(email);

		//? Check if the email address is already confirmed
		if (user && user.isEmailConfirmed) {
			this.logger.error('Email is already confirmed 🙂');
			throw new BadRequestException('Email already confirmed 🙄');
		}

		//* Check if the verification code is correct
		if (user.emailVerificationCode !== verificationCode) {
			throw new BadRequestException('Invalid verification code 🙄');
		}

		//? Otherwise, confirm the email address
		await this.usersService.markEmailAsConfirmed(email);

		this.logger.log('Email confirmed successfully 😍');
		return {
			success: true,
			message: 'Email address confirmed successfully 💃🏻💃🏻',
		};
	}

	/**
	 * Resend new verification code
	 */
	public async resendConfirmationCode(email: string): Promise<ResponseResult> {
		//? Ensure that the user email not already confirmed
		const user = await this.usersService.findByEmail(email);
		if (user?.isEmailConfirmed) {
			throw new BadRequestException('Email already confirmed 🙄');
		}

		//? Re-send the link again
		const result = await this.sendVerificationCode(user.name, user.email);

		if (result) {
			this.logger.log('Email confirmation resend 😉');
			return {
				success: true,
				message: 'Email confirmation resend 😉',
			};
		} else {
			this.logger.error('Cannot resend new confirmation link right now 😪');
			return {
				success: false,
				message: 'Cannot resend new confirmation link right now 😪',
			};
		}
	}

	/*----*/
	/**
	 * Generate 5 random numbers
	 * @returns generated number
	 */
	private generateVerificationCode(): number {
		//* Generate 5 random number
		const code: number = Math.floor(10000 + Math.random() * 90000);

		this.logger.debug(
			'Verification code generated to be used to confirm email address ✔, Code = ' +
				code,
		);

		return code;
	}
}
