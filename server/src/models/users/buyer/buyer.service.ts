import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { ComplaintService } from 'src/models/complaint/complaint.service';
import { CreateComplaintDto } from 'src/models/complaint/dto';
import { UserDocument } from '../shared-user/schema/user.schema';
import { AuctionValidationService } from 'src/models/auction/auction-validation.service';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { CreateReviewDto, UpdateReviewDto } from 'src/models/review/dto';
import { ReviewService } from 'src/models/review/review.service';
import { Review } from 'src/models/review/schema/review.schema';
import WalletService from 'src/providers/payment/wallet.service';
import { Buyer, BuyerDocument } from './schema/buyer.schema';
import { ListBidderAuctionsQueryDto } from './dto';
import { BidderAuctionsEnumQuery } from './enums';

@Injectable()
export class BuyerService {
	private readonly logger: Logger = new Logger(BuyerService.name);
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly complaintService: ComplaintService,
		private readonly auctionValidationService: AuctionValidationService,
		private readonly auctionService: AuctionsService,
		private readonly reviewService: ReviewService,
	) {}

	/* Profile Functions Logic */
	async getProfile(buyerId: string): Promise<Buyer> {
		//* Find buyer and populate his joined auctions
		const buyer = await this.buyerModel.findById(buyerId).populate({
			path: 'joinedAuctions',
			populate: ['category', 'seller'],
		});

		return buyer;
	}

	/* Auctions Functions Logic */

	/**
	 * List all the auctions that the bidder joined
	 * @param buyer -
	 * @returns List all joined auctions
	 */
	async listBidderJoinedAuctions(
		buyer: BuyerDocument,
		{ populateField }: ListBidderAuctionsQueryDto,
	): Promise<any> {
		//* First populate incoming field field
		await buyer.populate({
			path: populateField,
			populate: ['category', 'seller'],
		});

		let result;
		if (populateField == BidderAuctionsEnumQuery.JoinedAuction) {
			result = buyer.joinedAuctions;

			return { joinedAuctions: result };
		} else if (populateField == BidderAuctionsEnumQuery.SavedAuctions) {
			result = buyer.savedAuctions;
			return { savedAuctions: result };
		}
	}

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
			buyer._id,
		);

		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this bidder to the list of auction's bidders 😪❌",
			);
		}

		//* Add the auction to the list of joined auctions
		isAdded = await this.appendAuctionInJoinedAuctions(
			auctionId,
			buyer._id.toString(),
		);

		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this auctions to the list of joined auction's 😪❌",
			);
		}

		//TODO: Block the chair cost from the bidder wallet

		return { success: true, message: 'Bidder joined successfully ✔' };
	}

	async retreatFromAuction(buyer: Buyer, id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	/**
	 * Save the auction to be notified when start
	 * @param buyer - buyerId
	 * @param auctionId
	 */
	async saveAuctionForLater(
		buyer: Buyer,
		auctionId: string,
	): Promise<{ success: boolean; message: string }> {
		this.logger.debug(`Try to append ${buyer.name} to auction's waiting list!`);

		//? Validate the data first
		const validationResult =
			await this.auctionValidationService.validateBidderSaveAuction(
				auctionId,
				buyer._id.toString(),
			);

		//? If there is validation error, throw an exception
		if (!validationResult.success) {
			throw new BadRequestException(validationResult.message);
		}

		//* Add the buyer to the list of auction's bidders
		let isAdded: boolean = await this.auctionService.addBidderToWaitingList(
			auctionId,
			buyer._id.toString(),
		);

		if (!isAdded) {
			throw new BadRequestException(
				"Cannot append this bidder auction's waiting list 😪❌",
			);
		}

		//* Add the auction to the list of joined auctions
		isAdded = await this.appendAuctionInSavedAuctions(
			auctionId,
			buyer._id.toString(),
		);

		if (!isAdded) {
			throw new BadRequestException('Cannot save this auction right now');
		}

		return {
			success: true,
			message:
				'Auction saved successfully, you will be notified when auction start.',
		};
	}

	/**
	 * Add given auctions to list of bidder's joined auctions
	 * @param auctionId
	 * @param bidderId
	 * @return Promise<boolean>
	 */
	private async appendAuctionInJoinedAuctions(
		auctionId: string,
		bidderId: string,
	): Promise<boolean> {
		const updatedBidder = await this.buyerModel.findByIdAndUpdate(
			bidderId,
			{
				$push: { joinedAuctions: auctionId },
			},
			{ new: true },
		);

		return updatedBidder != null;
	}

	/**
	 * Save auction to get notified when start
	 * @param auctionId
	 * @param bidderId
	 * @returns Promise<boolean>
	 */
	private async appendAuctionInSavedAuctions(
		auctionId: string,
		bidderId: string,
	): Promise<boolean> {
		const updatedBidder = await this.buyerModel.findByIdAndUpdate(
			bidderId,
			{
				$push: { savedAuctions: auctionId },
			},
			{ new: true },
		);

		return updatedBidder != null;
	}

	/*------------------------------*/
	/* Review Functions Logic */

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

	/**
	 * Get review on specific seller
	 * @param buyerId
	 * @param sellerId
	 * @returns - Review if found
	 */
	async getReviewOnSeller(buyerId: string, sellerId: string) {
		return this.reviewService.getReviewInSeller(sellerId, buyerId);
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

	/*------------------------------*/
}
