import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serialize } from 'src/common/interceptors';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateAuctionDto, UpdateAuctionDto } from 'src/models/auction/dto';
import {
	Auction,
	AuctionDocument,
} from 'src/models/auction/schema/auction.schema';
import { ComplaintService } from 'src/models/complaint/complaint.service';
import { CreateComplaintDto } from 'src/models/complaint/dto';
import { UserDocument } from '../shared-user/schema/user.schema';
import { Seller, SellerDocument } from './schema/seller.schema';

@Injectable()
export class SellerService {
	//? Create logger
	private logger: Logger = new Logger('SellerService');

	constructor(
		@InjectModel(Seller.name)
		private readonly sellerModel: Model<SellerDocument>,
		private readonly auctionsService: AuctionsService,
		private readonly complaintService: ComplaintService,
	) {}

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
		return this.auctionsService.create(createAuctionDto, seller);
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

	createComplaint(body: CreateComplaintDto, User: UserDocument) {
		return this.complaintService.create(body, User.email);
	}
}
