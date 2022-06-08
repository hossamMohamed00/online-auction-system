import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ResponseResult } from 'src/common/types';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { UsersService } from 'src/models/users/shared-user/users.service';
import EmailService from 'src/providers/mail/email.service';
import { getNotifyAuctionStartContent } from './content/notify-auction-start-content';

@Injectable()
export class AuctionEmailsService {
	private logger: Logger = new Logger(AuctionEmailsService.name);

	//* Inject required services
	constructor(private readonly emailService: EmailService) {}

	/**
	 * Send email to list of bidders to notify that auction started
	 * @param auction: Auction details
	 * @param biddersEmailsList: List of bidders emails
	 */
	async notifyBiddersAuctionStart(
		auction: Auction,
		biddersEmailsList: string[],
	) {
		//? Get the email content
		const emailText = getNotifyAuctionStartContent(auction);

		//? Send the email
		const emailStatus: boolean = await this.emailService.sendMail({
			to: biddersEmailsList,
			subject: 'Online Auction - Auction started Notification 🔔',
			html: emailText,
		});

		if (emailStatus) {
			this.logger.log('Email has been sent to all bidders 📧');
			return true;
		} else {
			this.logger.log(
				'Cannot sent notification email right now right now ❌😢',
			);
			return false;
		}
	}
}
