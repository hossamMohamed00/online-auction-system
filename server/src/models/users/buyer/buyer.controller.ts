import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { CreateReviewDto } from 'src/models/review/dto/create-review.dto';
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { UpdateReviewDto } from 'src/models/review/dto/update-review.dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Role } from '../shared-user/enums';
import { BuyerService } from './buyer.service';
import { BuyerDto, ListBidderAuctionsQueryDto } from './dto';
import {
	BuyerAuctionsBehaviors,
	BuyerProfileBehaviors,
	BuyerReviewsBehaviors,
} from './interfaces';
import { Buyer, BuyerDocument } from './schema/buyer.schema';
import { FindReviewInSeller } from './../../review/dto/find-review-in-seller.dto';
import { Auction } from 'src/models/auction/schema/auction.schema';

@ApiTags('Buyer')
@Roles(Role.Buyer)
@Controller('buyer')
export class BuyerController
	implements
		BuyerAuctionsBehaviors,
		BuyerReviewsBehaviors,
		BuyerProfileBehaviors
{
	constructor(private readonly buyerService: BuyerService) {}

	/* Handle Profile Functions */

	@Get('profile')
	@Serialize(BuyerDto)
	@HttpCode(HttpStatus.OK)
	async getProfile(@GetCurrentUserData('_id') buyerId: string): Promise<Buyer> {
		return this.buyerService.getProfile(buyerId);
	}

	/* Handle Auctions Functions */
	@Get('auctions')
	@Serialize(BuyerDto)
	listBidderAuctions(
		@Query() listBidderAuctionsQueryDto: ListBidderAuctionsQueryDto,
		@GetCurrentUserData()
		buyer: BuyerDocument,
	): Promise<any> {
		return this.buyerService.listBidderJoinedAuctions(
			buyer,
			listBidderAuctionsQueryDto,
		);
	}

	@Post('auction/join/:id')
	@HttpCode(HttpStatus.OK)
	joinAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	) {
		return this.buyerService.joinAuction(buyer, id);
	}

	@Post('auction/retreat/:id')
	@HttpCode(HttpStatus.OK)
	retreatFromAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<boolean> {
		return this.buyerService.retreatFromAuction(buyer, id);
	}

	@Post('auction/save/:id')
	@HttpCode(HttpStatus.OK)
	saveAuctionForLater(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<{ success: boolean; message: string }> {
		return this.buyerService.saveAuctionForLater(buyer, id);
	}

	/*--------------------*/

	/* Review Behaviors */
	@Serialize(ReviewDto)
	@Post('review')
	submitReviewOnSeller(
		@Body() createReviewDto: CreateReviewDto,
		@GetCurrentUserData('_id') buyerId: string,
	): Promise<Review> {
		return this.buyerService.makeReview(createReviewDto, buyerId);
	}

	@Serialize(ReviewDto)
	@Get('review')
	getReviewOnSeller(
		@Query() { sellerId }: FindReviewInSeller,
		@GetCurrentUserData('_id') buyerId: string,
	): Promise<Review> {
		return this.buyerService.getReviewOnSeller(buyerId, sellerId);
	}

	@Serialize(ReviewDto)
	@Patch('review/:id')
	editReview(
		@Param() { id }: MongoObjectIdDto,
		@Body() updateReviewDto: UpdateReviewDto,
		@GetCurrentUserData('_id') buyerId: string,
	): Promise<Review> {
		return this.buyerService.editReview(id, updateReviewDto, buyerId);
	}

	@Serialize(ReviewDto)
	@Delete('review/:id')
	deleteReview(
		@Param() { id }: MongoObjectIdDto,
		@GetCurrentUserData('_id') buyerId: string,
	): Promise<Review> {
		return this.buyerService.removeReview(id, buyerId);
	}
}
