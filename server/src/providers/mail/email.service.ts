import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { MailConfigService } from 'src/config/mail/mail.config.service';

@Injectable()
export default class EmailService {
	private nodemailerTransport: Mail;

	constructor(private readonly mailConfigService: MailConfigService) {
		this.nodemailerTransport = createTransport({
			service: mailConfigService.service,
			auth: {
				user: mailConfigService.user,
				pass: mailConfigService.password,
			},
		});
	}

	async sendMail(options: Mail.Options) {
		const result = await this.nodemailerTransport.sendMail(options);
		console.log({ result });

		return result;
	}
}
