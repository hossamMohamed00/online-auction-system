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
import { BiddingIncrementRules } from 'src/providers/bids';
import {
	AdminManageAuctionsBehaviors,
	BiddingBehaviors,
	MainAuctionsBehaviors,
	ScheduleAuctionsBehaviors,
} from './interfaces';
import { AdminFilterAuctionQueryDto } from '../users/admin/dto';
import { DashboardAuctionsCount } from './types';
import { ResponseResult } from 'src/common/types';
import { Buyer } from '../users/buyer/schema/buyer.schema';

@Injectable()
export class AuctionsService
	implements
		MainAuctionsBehaviors,
		AdminManageAuctionsBehaviors,
		ScheduleAuctionsBehaviors,
		BiddingBehaviors
{
	private logger: Logger = new Logger('AuctionsService 👋🏻');

	constructor(
		@InjectModel(Auction.name)
		private readonly auctionModel: Model<AuctionDocument>,
		private readonly auctionValidationService: AuctionValidationService,
		private readonly biddingIncrementRules: BiddingIncrementRules,
		private readonly itemService: ItemService,
		private readonly startAuctionSchedulingService: AuctionSchedulingService,
		private readonly walletService: WalletService,
	) {}

	/* Handle Main Auctions Methods */

	/**
	 * Create new auction
	 * @param createAuctionDto
	 * @param seller - Seller who created the auction
	 */
	async create(
		createAuctionDto: CreateAuctionDto,
		seller: Seller,
	): Promise<Auction> {
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
	async findAll(
		filterAuctionQuery?: FilterAuctionQueryDto | AdminFilterAuctionQueryDto,
	): Promise<Auction[]> {
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
				'waitingBidders',
			];

			// Delete the populate fields from the filterAuctionQuery
			delete filterAuctionQuery.populate;
		}

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
	async findById(_id: string): Promise<Auction> {
		const auction = await this.auctionModel
			.findById(_id)
			.populate(['seller', 'category', 'item', 'winningBuyer'])
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
	): Promise<Auction> {
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
	async remove(auctionId: string, sellerId: string): Promise<Auction> {
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
	 * Check if there is any auctions that has status ongoing or upcoming in category
	 * @param categoryId
	 * @return true / false
	 */
	async isThereAnyRunningAuctionRelatedToCategory(
		categoryId: string,
	): Promise<boolean> {
		const auctions = await this.auctionModel.countDocuments({
			category: categoryId,
			status: { $in: [AuctionStatus.OnGoing, AuctionStatus.UpComing] },
		});

		return auctions > 0;
	}

	/**
	 * Remove all auctions related to specific category
	 * @param categoryId - category id
	 */
	async removeAllCategoryAuctions(categoryId: string): Promise<ResponseResult> {
		const auctions = await this.auctionModel.deleteMany({
			category: categoryId.toString(),
		});

		if (!auctions) {
			throw new BadRequestException(
				'Cannot remove auctions related to that category ❌',
			);
		}

		this.logger.log('All auctions related to the category deleted ✔✔ ');

		console.log({ auctions });

		return { success: true };
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

	/*---------------------------------------*/
	/* Handle Admin Manage Auctions Methods */
	/**
	 * Approve specific auction
	 * @param auctionId
	 * @return the updated auction
	 */
	async approveAuction(auctionId: string): Promise<Auction> {
		//? Get the auction from db
		const auction = await this.auctionModel.findById(auctionId);
		if (!auction) return null;

		if (auction.status === AuctionStatus.UpComing) {
			throw new BadRequestException('Auction is already approved ✔✔');
		}

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
	async rejectAuction(
		auctionId: string,
		rejectAuctionDto: RejectAuctionDto,
	): Promise<Auction> {
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

	/*
	 * Return auctions count to be displayed into admin dashboard
	 */
	async getAuctionsCount(): Promise<DashboardAuctionsCount> {
		//* Get total count of all auctions
		const auctions = await this.auctionModel.find();

		//* Get the auctions count
		const totalAuctions = auctions.length;

		//* Get count of pending auctions only
		const pendingAuctionsCount: number = auctions.filter(
			auction => auction.status === AuctionStatus.Pending,
		).length;

		//* Get count of ongoing auctions only
		const ongoingAuctionsCount: number = auctions.filter(
			auction => auction.status === AuctionStatus.OnGoing,
		).length;

		//* Get count of upcoming auctions only
		const upcomingAuctionsCount: number = auctions.filter(
			auction => auction.status === AuctionStatus.UpComing,
		).length;

		//* Get count of closed auctions only
		const closedAuctionsCount: number = auctions.filter(
			auction => auction.status === AuctionStatus.Closed,
		).length;

		//* Get count of denied auctions only
		const deniedAuctionsCount: number = auctions.filter(
			auction => auction.status === AuctionStatus.Denied,
		).length;

		return {
			totalAuctions,
			pendingAuctionsCount,
			ongoingAuctionsCount,
			upcomingAuctionsCount,
			closedAuctionsCount,
			deniedAuctionsCount,
		};
	}

	/**
	 * Return all winners bidders to be displayed in admin dashboard
	 */
	async getWinnersBiddersForDashboard(): Promise<any[]> {
		//* Get all auctions with status 'closed'
		const closedAuctions = await this.auctionModel
			.find({
				status: AuctionStatus.Closed,
			})
			.populate('winningBuyer')
			.sort({ startDate: -1 });

		const winnersBidders = [];

		//* return only winningBuyer _id, email, auction title and winningPrice
		closedAuctions.forEach(auction => {
			winnersBidders.push({
				winningBuyer: {
					_id: auction.winningBuyer._id,
					email: auction.winningBuyer.email,
				},
				auction: {
					_id: auction._id,
					title: auction.title,
				},
				winningPrice: auction.currentBid,
			});
		});

		return winnersBidders;
	}

	/**
	 * List auctions with highest number of bids
	 * @param top - How many documents to return (default: 5)
	 */
	async getTopAuctionsForDashboard(top?: number): Promise<Auction[]> {
		const topAuctions = await this.auctionModel
			.find({
				status: AuctionStatus.OnGoing,
			})
			.populate('category')
			.limit(top || 5)
			.sort({
				numOfBids: -1,
			});

		return topAuctions;
	}

	/*---------------------------------------*/
	/* Handle Schedule Auction Methods */

	/**
	 * Set the auction status to started(current auction)
	 * @param auctionId - Auction id
	 */
	async markAuctionAsStarted(auctionId: string): Promise<boolean> {
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
	async markAuctionAsEnded(auctionId: string): Promise<boolean> {
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
	 * Change auction status to specific status
	 * @param auctionId - Auction id
	 * @param status - Auction status
	 * @returns boolean
	 */
	async updateAuctionStatus(
		auctionId: string,
		status: AuctionStatus,
	): Promise<boolean> {
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

	/**
	 * Get the end date of given auction
	 * @param auctionId - Auction id
	 */
	async getAuctionEndDate(auctionId: string): Promise<any> {
		const endDate = await this.auctionModel
			.findById(auctionId)
			.select('endDate');

		return endDate;
	}

	/*-------------------------------*/
	/* Handle Bidder Related Methods */

	/**
	 * Check if the auction is available for bidding or not
	 * @param auctionId - Auction id
	 * @returns true or false
	 */
	async isValidAuctionForBidding(auctionId: string): Promise<boolean> {
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
	async isAlreadyJoined(auctionId: string, bidderId: string): Promise<boolean> {
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
	async hasMinAssurance(auctionId: string, bidderId: string): Promise<boolean> {
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
	async appendBidder(auctionId: string, bidderId: string): Promise<boolean> {
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
	 * Check if the auction is available to save (it is upcoming)
	 * @param auctionId
	 * @returns true or false
	 */
	async isAvailableToSave(auctionId: string) {
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			status: AuctionStatus.UpComing,
		});

		return count > 0;
	}

	/**
	 * Check if the bid value is greater than the minimum allowed bid value or not
	 * @param auctionId - Auction that the bid in
	 * @param bidValue - Incoming bid value
	 * @returns true if bid is greater than current bid, false otherwise
	 * Check if the bidder in auction's waiting list
	 * @param auctionId
	 * @param bidderId
	 * @returns Promise<boolean>
	 */
	async isAlreadyInWaitingList(
		auctionId: string,
		bidderId: string,
	): Promise<boolean> {
		const count = await this.auctionModel.countDocuments({
			_id: auctionId,
			waitingBidders: bidderId,
		});

		return count > 0;
	}

	/**
	 * Add bidder to the auction's waiting list
	 * @param auctionId - Auction id
	 * @param bidderId - Bidder id
	 * @returns Promise<boolean>
	 */
	async addBidderToWaitingList(
		auctionId: string,
		bidderId: string,
	): Promise<boolean> {
		//* push the bidder to the waiting list
		const auction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				$push: { waitingBidders: bidderId },
			},
			{ new: true },
		);

		return auction != null;
	}

	/**
	 * Check if the bid is valid (bidValue > minimum bid value) and auction still ongoing
	 * @param auctionId - Auction id
	 * @param bidValue - incoming bid value
	 * @returns boolean
	 */
	async isValidBid(auctionId: string, bidValue: number): Promise<boolean> {
		//* Get the auction
		const auction = await this.auctionModel.findById(auctionId);

		//* Check if the bid is greater than the current bid and the opening bid
		return bidValue >= auction.minimumBidAllowed;
	}

	/**
	 * Handle new bid (increment bid number on the auction and add the current bid value)
	 * @param auctionId
	 * @param bid
	 */
	async handleNewBid(auctionId: string, bid: Bid): Promise<boolean> {
		//* Calculate the bid increment
		const bidIncrement = this.calcBidIncrement(bid.amount);

		//* Calculate the new minimum bid
		const newMinimumBid = this.calculateMinimumBidAllowed(
			bid.amount,
			bidIncrement,
		);

		//* Find the auction and update it
		const auction = await this.auctionModel.findByIdAndUpdate(
			auctionId,
			{
				$inc: { numOfBids: 1 }, // Increment the number of bids
				currentBid: bid.amount, // Set the current bid to bid value
				bidIncrement, // Set the bid increment
				minimumBidAllowed: newMinimumBid, // Set the new minimum bid
				winningBuyer: bid.user, // Set the winning bidder
			},
			{ new: true },
		);

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
	async getCurrentAuctionDetailsForBidding(auctionId: string): Promise<any> {
		//* Select specific fields from the auction document
		const auctionDetails = await this.auctionModel
			.findById(auctionId)
			.select(
				'basePrice numOfBids currentBid bidIncrement minimumBidAllowed winningBuyer',
			)
			.populate('winningBuyer');

		//* Return custom data to the client-side
		const {
			_id,
			basePrice,
			currentBid,
			bidIncrement,
			minimumBidAllowed,
			numOfBids,
			winningBuyer,
		} = auctionDetails;

		return {
			_id,
			basePrice,
			currentBid,
			bidIncrement,
			minimumBidAllowed,
			numOfBids,
			winningBuyer: {
				_id: winningBuyer?._id,
				name: winningBuyer?.name,
				email: winningBuyer?.email,
			},
		};
	}

	/**
	 * Get the winner for an auction
	 * @param auctionId - Auction id
	 */
	async getAuctionWinner(auctionId: string): Promise<any> {
		const auction = await this.auctionModel
			.findOne({
				_id: auctionId,
				status: AuctionStatus.Closed,
			})
			.populate('winningBuyer');

		if (!auction) {
			return null;
		}

		const auctionWinner = auction.winningBuyer;

		return {
			_id: auctionWinner._id,
			name: auctionWinner.name,
			email: auctionWinner.email,
		};
	}
	/*-------------------------*/
	/* Helper functions */

	/**
	 * Get the bid increment based on the current bid value from BiddingIncrementRules
	 * @param bidValue - Current bid value
	 * @returns calculated bid increment based on the current bid
	 */
	private calcBidIncrement(bidValue: number) {
		//* Calculate the new bid increment
		return this.biddingIncrementRules.calcBidIncrementBasedOnValue(bidValue);
	}

	/**
	 * Calculate the minimum bid allowed for that auction
	 * @param bidValue - Current bid amount
	 * @returns minimum bid allowed based on given bid value
	 */
	private calculateMinimumBidAllowed(bidValue: number, bidIncrement: number) {
		//* Calculate the new minimum bid by adding the current bid value with the calculated bid increment
		const newMinimumBid = bidValue + bidIncrement;

		return newMinimumBid;
	}

	/**
	 *Calculate the amount of money needed to join the auction
	 * @param basePrice : The opening price for the auction
	 * @returns
	 */
	private calculateChairCost(basePrice: number) {
		//* The chair cost will be 25% of the base price
		return basePrice * 0.25;
	}

	/*--------------------------*/
}
