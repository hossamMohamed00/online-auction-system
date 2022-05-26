import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionValidationService } from 'src/models/auction/auction-validation.service';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateReviewDto, UpdateReviewDto } from 'src/models/review/dto';
import { ReviewService } from 'src/models/review/review.service';
import { Review } from 'src/models/review/schema/review.schema';
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
		private readonly reviewService: ReviewService,
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
		const isAdded: boolean = await this.auctionService.appendBidder(
			auctionId,
			buyer._id,
		);

		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this bidder to the list of auction's bidders 😪❌",
			);
		}

		//TODO: Block the chair cost from the bidder wallet

		return { success: true, message: 'Bidder joined successfully ✔' };
	}

	async retreatFromAuction(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async saveAuctionForLater(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async findAll() {
		const buyers = await this.buyerModel.find().exec();
		return buyers;
	}

	/*------------------------------*/
	/**
	 * Create new review in seller
	 * @param createReviewDto
	 * @param buyerId
	 * @param sellerId
	 * @returns created review
	 */
	async makeReview(
		createReviewDto: CreateReviewDto,
		buyerId: string,
	): Promise<Review> {
		this.logger.log(
			'Creating new review in' + createReviewDto.seller + ' from ' + buyerId,
		);

		return this.reviewService.create(createReviewDto, buyerId);
	}

	async editReview(
		id: string,
		UpdateReviewDto: UpdateReviewDto,
		buyerId: string,
	): Promise<Review> {
		return this.reviewService.updateReview(UpdateReviewDto, id, buyerId);
	}

	/**
	 * Remove review by buyer
	 * @param reviewId
	 * @param buyerId
	 * @returns removed review
	 */
	async removeReview(reviewId: string, buyerId: string): Promise<Review> {
		return this.reviewService.remove(reviewId, buyerId);
	}
}
