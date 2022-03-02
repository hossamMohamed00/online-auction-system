import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import { ItemService } from '../items/item.service';
import { Seller } from '../users/seller/schema/seller.schema';
import { CreateAuctionDto, UpdateAuctionDto } from './dto';
import { AuctionStatus } from './enums';
import { Auction, AuctionDocument } from './schema/auction.schema';

@Injectable()
export class AuctionsService {
	constructor(
		@InjectModel(Auction.name)
		private readonly auctionModel: Model<AuctionDocument>,
		private readonly itemService: ItemService,
		private readonly categoryService: CategoryService,
	) {}

	/**
	 * Create new auction
	 * @param createAuctionDto
	 * @param seller - Seller who created the auction
	 */
	async create(createAuctionDto: CreateAuctionDto, seller: Seller) {
		//* Get the item data and category data
		const {
			item: itemData,
			category: categoryId,
			...restAuctionData
		} = createAuctionDto;

		//? Ensure that the category exists
		const isExists = await this.categoryService.isExists(categoryId);
		if (!isExists) {
			throw new BadRequestException('Category not found ❌.');
		}

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
			category: categoryId,
		});

		//* Save the instance
		await createdAuction.save();

		return createdAuction;
	}

	/**
	 * Find all auctions
	 * @returns List of all existing auctions
	 */
	async findAll() {
		const auctions = await this.auctionModel.find({}).populate('seller').exec();
		console.log({ auctions });

		return auctions;
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
	 * @param auctionId - Auction id
	 * @param sellerId - Seller id
	 * @param updateAuctionDto - Dto for auction's properties to be updated
	 * @returns updated auction instance
	 */
	async update(
		auctionId: string,
		sellerId: string,
		{ item: itemNewData, ...updateAuctionDto }: UpdateAuctionDto,
	) {
		//? Check if the auction exists or not
		const isExists = await this.isExists(auctionId, sellerId);
		if (!isExists) {
			throw new BadRequestException('Auction not found for that seller ❌');
		}

		//? Update the item first if it changed
		if (itemNewData) {
			await this.itemService.update(itemNewData._id, itemNewData);
		}

		//* Add the status to the object and set it back to 'pending'
		updateAuctionDto['status'] = AuctionStatus.Pending;

		//* Find the auction and update it
		const auction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			updateAuctionDto,
			{ new: true },
		);

		return auction;
	}

	/**
	 * Remove auction by id
	 * @param auctionId
	 * @param sellerId
	 * @returns Deleted auction instance
	 */
	async remove(auctionId: string, sellerId: string) {
		const auction = await this.auctionModel.findOneAndRemove({
			_id: auctionId,
			seller: sellerId,
		});
		if (!auction)
			throw new NotFoundException('Auction not found for that seller❌');

		return auction;
	}

	/**
	 * Check if auction exists or not
	 * @param auctionId
	 * @param sellerId
	 * @returns true if auction exists, false otherwise
	 */
	async isExists(auctionId: string, sellerId: string): Promise<boolean> {
		//? Check if the seller owns this auction
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			seller: sellerId,
		});

		return count > 0;
	}

	/* Helper functions */

	/**
	//TODO Calculate the minimum bid allowed for that auction
	 */
	calculateMinimumBidAllowed() {}

	/**
	 //TODO Calculate the amount of money needed to join the auction
	 */
	calculateChairCost() {
		return 0;
	}
}
