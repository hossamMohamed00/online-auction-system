import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import WalletService from 'src/providers/payment/wallet.service';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	private readonly logger: Logger = new Logger(BuyerService.name);
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly walletService: WalletService,
	) {}

	joinAuction(buyer: Buyer, id: string): Promise<boolean> {
		this.logger.debug('Try to add ' + buyer.email + ' to auction users list!');

		return Promise.resolve(true);
	}

	retreatFromAuction(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	saveAuctionForLater(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
