import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateAuctionDto } from 'src/models/auction/dto';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';
import { Seller, SellerDocument } from './schema/seller.schema';

@Injectable()
export class SellerService {
	constructor(
		@InjectModel(Seller.name)
		private readonly sellerModel: Model<SellerDocument>,
		private readonly auctionsService: AuctionsService,
	) {}

	/* Handle Auctions Functions logic*/

	/**
	 * Add new auction to the given seller
	 * @param createAuctionDto - Auction data
	 * @param seller
	 */
	addAuction(createAuctionDto: CreateAuctionDto, seller: SellerDocument) {
		const auction = this.auctionsService.create(createAuctionDto, seller);
		return auction;
	}

	/**
	 * List seller's auctions
	 */
	async listAuctions(seller: SellerDocument): Promise<AuctionDocument[]> {
		await seller.populate({
			path: 'auctions',
		});

		// @ts-ignore: Unreachable code error
		const auctions: AuctionDocument[] = seller.auctions;

		return auctions;
	}

	/**
	 * Remove auction by id of specific seller
	 * @param auctionId
	 * @param sellerId
	 * @returns deleted auction document
	 */
	async removeAuction(auctionId: string, sellerId: string) {
		// TODO - Ensure that the seller owns this auction

		return this.auctionsService.remove(auctionId);
	}
}
