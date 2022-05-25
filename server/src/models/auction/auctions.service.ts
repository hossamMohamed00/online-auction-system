import {
	BadRequestException,
	Injectable,
	NotFoundException,
	Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ItemService } from '../items/item.service';
import { Seller } from '../users/seller/schema/seller.schema';
import {
	CreateAuctionDto,
	FilterAuctionQueryDto,
	RejectAuctionDto,
	UpdateAuctionDto,
} from './dto';
import { AuctionStatus } from './enums';
import { Auction, AuctionDocument } from './schema/auction.schema';
import { HandleDateService } from 'src/common/utils';
import { AuctionValidationService } from './auction-validation.service';
import { AuctionSchedulingService } from 'src/providers/schedule/auction/auction-scheduling.service';
import WalletService from 'src/providers/payment/wallet.service';
import { Bid } from '../bids/schema/bid.schema';

@Injectable()
export class AuctionsService {
	constructor(
		@InjectModel(Auction.name)
		private readonly auctionModel: Model<AuctionDocument>,
		private readonly auctionValidationService: AuctionValidationService,
		private readonly itemService: ItemService,
		private readonly startAuctionSchedulingService: AuctionSchedulingService,
		private readonly walletService: WalletService,
	) {}

	private logger: Logger = new Logger('AuctionsService 👋🏻');
	/**
	 * Create new auction
	 * @param createAuctionDto
	 * @param seller - Seller who created the auction
	 */
	async create(createAuctionDto: CreateAuctionDto, seller: Seller) {
		//? Validate the data first
		const validationResult =
			await this.auctionValidationService.validateCreateAuctionData(
				createAuctionDto,
			);

		//? If there is validation error, throw an exception
		if (!validationResult.success) {
			throw new BadRequestException(validationResult.message);
		}

		//* Create new item with this data
		const createdItem = await this.itemService.create(createAuctionDto.item);

		//? Set the Minimum Bid Allowed to be equal to the basePrice.
		const MinBidAllowed = createAuctionDto.basePrice;

		//? Calc tha chair cost value
		const chairCostValue = this.calculateChairCost(createAuctionDto.basePrice);

		//* Create new auction document
		const createdAuction: AuctionDocument = new this.auctionModel({
			title: createAuctionDto.title,
			basePrice: createAuctionDto.basePrice,
			startDate: createAuctionDto.startDate,
			minimumBidAllowed: MinBidAllowed,
			chairCost: chairCostValue,
			item: createdItem,
			category: createAuctionDto.category,
			seller,
		});

		//* Save the instance
		await createdAuction.save();

		this.logger.log('New auction created and now waiting for approval ✔✔');

		return createdAuction;
	}

	/**
	 * Find all auctions
	 * @Param filterAuctionQuery - Contains search criteria
	 * @returns List of all existing auctions
	 */
	async findAll(filterAuctionQuery?: FilterAuctionQueryDto) {
		let populateFields = [];

		//* Check if the user want to populate the nested docs
		const wantToPopulate = filterAuctionQuery?.populate;
		if (wantToPopulate) {
			populateFields = [
				'seller',
				'category',
				'item',
				'winningBuyer',
				'bidders',
			];

			// Delete the populate fields from the filterAuctionQuery
			delete filterAuctionQuery.populate;
		}

		//TODO: Don't send denied auctions to normal users
		const auctions = await this.auctionModel
			.find(filterAuctionQuery)
			.populate(populateFields);

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
			.populate(['seller', 'category', 'item', 'winningBuyer'])
			.exec();

		if (!auction) throw new NotFoundException('Auction not found ❌');

		return auction;
	}

	/**
	 * Get the end date of given auction
	 * @param auctionId - Auction id
	 */
	async getAuctionEndDate(auctionId: string) {
		const endDate = await this.auctionModel
			.findById(auctionId)
			.select('endDate');

		return endDate;
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
	 * Approve specific auction
	 * @param auctionId
	 * @return the updated auction
	 */
	async approveAuction(auctionId: string): Promise<Auction> {
		// BAD APPROACH --> 2 Requests to the db

		//? Get the auction from db
		const auction = await this.auctionModel.findById(auctionId);
		if (!auction) return null;

		//? Prepare the end date
		const auctionStartDate = auction.startDate;

		//* Add 7 days to the startDate
		const newEndDate =
			HandleDateService.getNewEndDateFromStartDate(auctionStartDate);

		//? Find the auction by id and set the status to be UpComing and the new end date
		const approvedAuction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				$set: {
					status: AuctionStatus.UpComing, // Update status to up coming
					endDate: newEndDate, // Update end date
				},
			},
			{ new: true },
		);

		//* Schedule the auction to run in start date automatically
		this.startAuctionSchedulingService.addCronJobForStartAuction(
			approvedAuction._id,
			approvedAuction.startDate,
		);

		//* Display log message
		this.logger.log(
			'Auction with title ' +
				approvedAuction.title +
				' approved successfully 👏🏻',
		);
		return approvedAuction;
	}

	/**
	 * Reject specific auction and supply rejection message
	 * @param auctionId
	 * @param rejectAuctionDto - The rejection message
	 */
	async rejectAuction(auctionId: string, rejectAuctionDto: RejectAuctionDto) {
		const rejectedAuction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				status: AuctionStatus.Denied,
				rejectionMessage: rejectAuctionDto.message,
			},
			{ new: true },
		);

		return rejectedAuction;
	}

	/**
	 * Set the auction status to started(current auction)
	 * @param auctionId - Auction id
	 */
	async markAuctionAsStarted(auctionId: string) {
		//? Update auction and set the status to be OnGoing.
		const result = await this.updateAuctionStatus(
			auctionId,
			AuctionStatus.OnGoing,
		);

		if (!result) {
			throw new BadRequestException(
				'Unable to start auction, auction not found ❌',
			);
		}

		this.logger.debug('New auction started and now open to accept bids!!');

		return true;
	}

	/**
	 * Set the auction status to ended(close auction)
	 * @param auctionId
	 */
	async markAuctionAsEnded(auctionId: string) {
		//? Update auction and set the status to be closed.
		const result = await this.updateAuctionStatus(
			auctionId,
			AuctionStatus.Closed,
		);

		if (!result) {
			throw new BadRequestException(
				'Unable to end auction, auction not found ❌',
			);
		}

		this.logger.debug('Auction with id ' + auctionId + ' ended successfully!!');

		return true;

		//TODO: Check who the winner of the auction
	}

	/**
	 * Remove auction by id
	 * @param auctionId
	 * @param sellerId
	 * @returns Deleted auction instance
	 */
	async remove(auctionId: string, sellerId: string) {
		this.logger.log('Removing auction with id ' + auctionId + '... 🚚');
		const auction: AuctionDocument = await this.auctionModel.findOne({
			_id: auctionId,
			seller: sellerId,
		});
		if (!auction)
			throw new NotFoundException('Auction not found for that seller❌');

		//* Remove the auction using this approach to fire the pre hook event
		await auction.remove();

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

	/**
	 * Check if there are an auction with given id
	 * @param auctionId
	 * @returns true if auction exists, false otherwise
	 */
	async isValidAuction(auctionId: string): Promise<boolean> {
		//? Get the count of auctions with given id
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			status: AuctionStatus.OnGoing,
		});

		return count > 0;
	}

	/**
	 * Check if the auction is available for bidding or not
	 * @param auctionId - Auction id
	 * @returns true or false
	 */
	async isAvailableToJoin(auctionId: string): Promise<boolean> {
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			status: AuctionStatus.OnGoing,
		});

		return count > 0;
	}

	/**
	 * Check if the bidder exists in the auction bidder list or not
	 * @param auctionId - Auction id
	 * @param bidderId - Bidder id
	 * @returns Promise<boolean>
	 */
	async isAlreadyJoined(auctionId: string, bidderId: ObjectId) {
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			bidders: bidderId,
		});

		return count > 0;
	}

	/**
	 * Check if the bidder has the minimum assurance for an auction
	 * @param auctionId
	 * @param bidderId
	 * @returns true if he has, false otherwise
	 */
	async hasMinAssurance(auctionId: string, bidderId: ObjectId) {
		//* Get the auction
		const auction = await this.auctionModel.findById(auctionId);

		//* Extract the chair cost
		const auctionChairCost = auction.chairCost;

		//* Get buyer wallet balance
		const { balance } = await this.walletService.getWalletBalance(bidderId);

		return balance >= auctionChairCost;
	}

	/**
	 * Add new bidder to the list of auction's bidders
	 * @param auctionId - Auction id
	 * @param bidderId - Bidder id
	 * @returns Promise<boolean>
	 */
	async appendBidder(auctionId: string, bidderId: ObjectId): Promise<boolean> {
		const auction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				$push: { bidders: bidderId },
			},
			{ new: true },
		);

		return auction != null;
	}

	/**
	 * Check if the bid value is greater than the current bid value or not
	 * @param auctionId - Auction that the bid in
	 * @param bidValue - Incoming bid value
	 * @returns true if bid is greater than current bid, false otherwise
	 */
	async isValidBid(auctionId: string, bidValue: number) {
		//* Get the auction
		const auction = await this.auctionModel.findById(auctionId);

		//* Extract the current bid value
		const currentBidValue = auction.currentBid;

		//* Check if the bid is greater than the current bid
		return bidValue > currentBidValue;
	}

	/**
	 * Handle new bid (increment bid number on the auction and add the current bid value)
	 * @param auctionId
	 * @param bid
	 */
	async handleNewBid(auctionId: string, bid: Bid): Promise<boolean> {
		//* Find the auction and update it
		const auction = await this.auctionModel.findByIdAndUpdate(auctionId, {
			$inc: { numOfBids: 1 }, // Increment the number of bids
			currentBid: bid.amount, // Set the current bid to bid value
		});

		if (!auction) {
			throw new NotFoundException('Auction not found❌');
		}

		return auction ? true : false;
	}

	/**
	 * Return some of auction details used to be displayed in bidding room
	 * @param auctionId
	 * @returns Auction details
	 */
	async getCurrentAuctionDetailsForBidding(auctionId: string) {
		//* Select specific fields from the auction document
		const auctionDetails = await this.auctionModel
			.findById(auctionId)
			.select('numOfBids currentBid bidIncrement');

		return auctionDetails;
	}

	/**
	 * Change auction status to specific status
	 * @param auctionId - Auction id
	 * @param status - Auction status
	 * @returns boolean
	 */
	async updateAuctionStatus(auctionId: string, status: AuctionStatus) {
		//? Find the auction by id and set the status
		const auction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				$set: {
					status: status,
				},
			},
			{ new: true },
		);

		if (!auction) {
			return false;
		}
		return true;
	}
	/* Helper functions */

	/**
	//TODO Calculate the minimum bid allowed for that auction
	 */
	private calculateMinimumBidAllowed() {}

	/**
	 //TODO Calculate the amount of money needed to join the auction
	 @param basePrice: The opening price for the auction
	 */
	private calculateChairCost(basePrice: number) {
		//* The chair cost will be 25% of the base price
		return basePrice * 0.25;
	}
}
