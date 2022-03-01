import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateAuctionDto } from 'src/models/auction/dto';
import {
	Auction,
	AuctionDocument,
} from 'src/models/auction/schema/auction.schema';
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
	async addAuction(
		createAuctionDto: CreateAuctionDto,
		seller: SellerDocument,
	): Promise<Auction> {
		const auction = this.auctionsService.create(createAuctionDto, seller);
		return auction;
	}

	/**
	 * List seller's auctions
	 */
	async listAuctions(seller: SellerDocument) {
		/*
		 * Populate 'auctions' property to the seller
		 */
		await seller.populate({ path: 'auctions' });

		console.log(`Is Populated ${seller.populated('auctions')}`);

		// FIXME: Fix this error
		// @ts-ignore: Unreachable code error
		const auctions: AuctionDocument[] = seller.auctions;

		console.log({ auctions });

		return auctions;
	}

	//TODO: Update auction data
	async editAuction(): Promise<Auction> {
		throw new Error('Not Implemented yet');
	}

	/**
	 * Remove auction by id of specific seller
	 * @param auctionId
	 * @param sellerId
	 * @returns deleted auction document
	 */
	async removeAuction(auctionId: string, sellerId: string): Promise<Auction> {
		// TODO - Ensure that the seller owns this auction

		return this.auctionsService.remove(auctionId);
	}
}
