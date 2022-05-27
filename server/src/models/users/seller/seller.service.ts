import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateAuctionDto, UpdateAuctionDto } from 'src/models/auction/dto';
import {
	Auction,
	AuctionDocument,
} from 'src/models/auction/schema/auction.schema';
import { Review } from 'src/models/review/schema/review.schema';
import { Seller, SellerDocument } from './schema/seller.schema';
import { ReviewService } from 'src/models/review/review.service';

@Injectable()
export class SellerService {
	//? Create logger
	private logger: Logger = new Logger('SellerService');

	constructor(
		@InjectModel(Seller.name)
		private readonly sellerModel: Model<SellerDocument>,
		private readonly auctionsService: AuctionsService,
		private readonly reviewService: ReviewService,
	) {}

	/* Handle Profile Functions logic*/
	async getProfile(
		sellerId: string,
	): Promise<{ seller: Seller; auctions: Auction[]; reviews: Review[] }> {
		//* Find seller
		const seller = await this.sellerModel.findById(sellerId);

		//* Get seller auctions
		const auctions: Auction[] = await this.listAuctions(seller);

		//* Get seller reviews
		const reviews: Review[] = await this.listSellerReviews(sellerId);

		return { seller, auctions, reviews };
	}
	/* Handle Auctions Functions logic*/

	/**
	 * Add new auction to the given seller
	 * @param createAuctionDto - Auction data
	 * @param seller
	 */
	async addAuction(
		createAuctionDto: CreateAuctionDto,
		seller: SellerDocument,
	): Promise<Auction> {
		return this.auctionsService.createNewAuction(createAuctionDto, seller);
	}

	/**
	 * List seller's auctions
	 */
	async listAuctions(seller: SellerDocument) {
		/*
		 * Populate 'auctions' property to the seller
		 * Also populate item and category documents
		 */
		this.logger.log(
			'Populating auctions on seller and nested item and category...',
		);
		await seller.populate({
			path: 'auctions',
			populate: [
				{
					path: 'item',
				},
				{
					path: 'category',
				},
				{
					path: 'winningBuyer',
				},
			],
		});

		// FIXME: Fix this error
		// @ts-ignore: Unreachable code error
		const auctions: AuctionDocument[] = seller.auctions;

		return auctions;
	}

	/**
	 * Update specific auction for the seller
	 * @param auctionId - Auction id
	 * @param sellerId - Logged in seller id
	 * @param updateAuctionDto - New auction data
	 * @returns Updated auction instance
	 */
	async editAuction(
		auctionId: string,
		sellerId: string,
		updateAuctionDto: UpdateAuctionDto,
	): Promise<Auction> {
		return this.auctionsService.update(auctionId, sellerId, updateAuctionDto);
	}

	/**
	 * Remove auction by id of specific seller
	 * @param auctionId
	 * @param sellerId
	 * @returns deleted auction document
	 */
	async removeAuction(auctionId: string, sellerId: string): Promise<Auction> {
		return this.auctionsService.remove(auctionId, sellerId);
	}

	/* Handle Reviews Functions logic */

	/**
	 * List all seller reviews
	 * @param sellerId
	 * @returns Array of reviews for that seller
	 */
	async listSellerReviews(sellerId: string) {
		return this.reviewService.getSellerReviews(sellerId);
	}

	/**
	 * Accept seller rate and update the rating in db
	 * @param sellerId - Seller id
	 * @param rate - new calculated rating
	 * @returns void
	 */
	async updateSellerRating(sellerId: string | Seller, rate: number) {
		const seller = await this.sellerModel.findByIdAndUpdate(
			sellerId,
			{
				rating: rate,
			},
			{ new: true },
		);

		if (!seller) {
			this.logger.error(`Cannot update ${seller.name} rate.`);
			return;
		}

		this.logger.log(
			`Seller ${seller.name} rating successfully update and become ${seller.rating}`,
		);
	}
}
