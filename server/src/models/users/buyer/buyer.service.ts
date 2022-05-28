import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuctionValidationService } from 'src/models/auction/auction-validation.service';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { Auction } from 'src/models/auction/schema/auction.schema';
import WalletService from 'src/providers/payment/wallet.service';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	private readonly logger: Logger = new Logger(BuyerService.name);
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly walletService: WalletService,
		private readonly auctionValidationService: AuctionValidationService,
		private readonly auctionService: AuctionsService,
	) {}

	/**
	 * Add the bidder to the list of auction's bidders
	 * @param buyer - Bidder object
	 * @param auctionId - Wanted auction
	 * @returns result
	 */
	async joinAuction(buyer: Buyer, auctionId: string) {
		this.logger.debug('Try to add ' + buyer.email + ' to auction users list!');

		//? Validate the data first
		const validationResult =
			await this.auctionValidationService.validateBidderJoinAuction(
				auctionId,
				buyer._id,
			);

		//? If there is validation error, throw an exception
		if (!validationResult.success) {
			throw new BadRequestException(validationResult.message);
		}

		//* Add the buyer to the list of auction's bidders
		let isAdded: boolean = await this.auctionService.appendBidder(
			auctionId,
			buyer._id.toString(),
		);

		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this bidder to the list of auction's bidders 😪❌",
			);
		}

		//* Append the auction to joinedAuction array of the buyer
		isAdded = await this.appendAuction(buyer._id, auctionId);
		if (!isAdded) {
			throw new BadRequestException(
				'Cannot append this auction to the list of joined auctions 😪❌',
			);
		}

		//TODO: Block the chair cost from the bidder wallet

		return { success: true, message: 'Bidder joined successfully ✔' };
	}

	/**
	 * Get buyer joined auctions
	 * @param buyerId
	 * @returns List of all joined auctions
	 */
	async listMyAuctions(buyerId: string | ObjectId): Promise<Auction[]> {
		//* Find the buyer and populate the array
		const buyerDoc = await this.buyerModel
			.findById(buyerId)
			.populate('joinedAuctions');

		//* Return only the joinedAuctions array
		return buyerDoc.joinedAuctions;
	}

	async retreatFromAuction(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async saveAuctionForLater(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	/*- Helper Functions--*/

	/**
	 * Append the auction to joinedAuctions array of the buyer
	 * @param buyerId
	 * @param auctionId
	 * @returns true or false
	 */
	private async appendAuction(
		buyerId: ObjectId,
		auctionId: string,
	): Promise<boolean> {
		const buyer = await this.buyerModel.findByIdAndUpdate(
			buyerId,
			{
				$push: { joinedAuctions: auctionId },
			},
			{ new: true },
		);

		return buyer != null;
	}
}
