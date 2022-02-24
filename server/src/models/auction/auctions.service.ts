import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from '../items/item.service';
import { Seller } from '../users/seller/schema/seller.schema';
import { User } from '../users/shared-user/schema/user.schema';
import { CreateAuctionDto, UpdateAuctionDto } from './dto';
import { Auction, AuctionDocument } from './schema/auction.schema';

@Injectable()
export class AuctionsService {
	constructor(
		@InjectModel(Auction.name)
		private readonly auctionModel: Model<AuctionDocument>,
		private readonly itemService: ItemService,
	) {}

	/**
	 * Create new auction
	 * @param createAuctionDto
	 * @param seller - Seller who created the auction
	 */
	async create(createAuctionDto: CreateAuctionDto, seller: Seller) {
		//* Get the item data
		const { item: itemData, ...restAuctionData } = createAuctionDto;

		//* Create new item with this data
		const item = await this.itemService.create(itemData);

		//? Calc and get the Minimum Bid Allowed for that auction
		const MinBidAllowed = 0;

		//? Calc tha chair cost value
		const chairCostValue = 0;

		//* Create new auction document
		const createdAuction: AuctionDocument = new this.auctionModel({
			...restAuctionData,
			minimumBidAllowed: MinBidAllowed,
			chairCost: chairCostValue,
			item,
			seller,
		});

		//* Save the instance
		await createdAuction.save();
		return createdAuction;
	}

	/**
	 * Find all auctions
	 * @returns List of all existing auctions
	 */
	findAll() {
		return this.auctionModel.find({}).populate('seller').exec();
	}

	/**
	 * Find auction by id
	 * @param _id - Auction id
	 * @returns Auction instance if found, NotFoundException thrown otherwise.
	 */
	async findById(_id: string) {
		const auction = await this.auctionModel
			.findById(_id)
			.populate('seller')
			.exec();

		if (!auction) throw new NotFoundException('Auction not found ❌');

		return auction;
	}

	/**
	 * Update auction details
	 * @param _id - Auction id
	 * @param updateAuctionDto - Dto for auction's properties to be updated
	 * @returns updated auction instance
	 */
	async update(_id: string, updateAuctionDto: UpdateAuctionDto) {
		const auction = await this.auctionModel.findByIdAndUpdate(
			_id,
			updateAuctionDto,
			{ new: true },
		);
		if (!auction) throw new NotFoundException('Auction not found ❌');

		return auction;
	}

	/**
	 * Remove auction by id
	 * @param _id - auction id
	 * @returns Deleted auction instance
	 */
	async remove(_id: string) {
		const auction = await this.auctionModel.findByIdAndRemove(_id);
		if (!auction) throw new NotFoundException('Auction not found ❌');

		return auction;
	}

	/* Helper functions */

	/**
	 * Calculate the minimum bid allowed for that auction
	 */
	calculateMinimumBidAllowed() {}

	/**
	 * Calculate the amount of money needed to join the auction
	 */
	calculateChairCost() {
		return 0;
	}
}
