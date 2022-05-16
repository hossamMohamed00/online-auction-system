import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import WalletService from 'src/providers/payment/wallet.service';
import { User, UserDocument } from '../shared-user/schema/user.schema';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	private readonly logger: Logger = new Logger(BuyerService.name);
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly walletService: WalletService,
		private readonly auctionService: AuctionsService,
	) {}

	async joinAuction(buyer: Buyer, auctionId: string) {
		this.logger.debug('Try to add ' + buyer.email + ' to auction users list!');

		//? Ensure that auction is available to join (is currently ongoing)
		const isAvailable = await this.auctionService.isAvailableToJoin(auctionId);
		if (!isAvailable) {
			throw new BadRequestException(
				'This auction currently is not available to join ✖✖',
			);
		}

		//TODO: Ensure that the buyer has auction's assurance in his wallet
		// const hasMinAssurance = await this.auctionService.hasMinAssurance(auctionId, buyer.email);

		//* Add the buyer to the list of auction's bidders
		const isAdded: boolean = await this.auctionService.appendBidder(
			auctionId,
			buyer._id,
		);
		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this bidder to the list of auction's bidders 😪❌",
			);
		}

		return { success: true, message: 'Bidder joined successfully ✔' };
	}

	async retreatFromAuction(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async saveAuctionForLater(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
