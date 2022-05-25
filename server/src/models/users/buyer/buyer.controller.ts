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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	GetCurrentUserData,
	IsPublicRoute,
	Roles,
} from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { CreateReviewDto } from 'src/models/review/dto/create-review.dto';
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { UpdateReviewDto } from 'src/models/review/dto/update-review.dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Role } from '../shared-user/enums';
import { BuyerService } from './buyer.service';
import { BuyerAuctionsBehaviors, BuyerReviewsBehaviors } from './interfaces';
import { Buyer } from './schema/buyer.schema';

@ApiTags('Buyer')
@Roles(Role.Buyer)
@Controller('buyer')
export class BuyerController
	implements BuyerAuctionsBehaviors, BuyerReviewsBehaviors
{
	constructor(private readonly buyerService: BuyerService) {}

	/* Handle Auctions Functions */
	@Post('auction/:id')
	@HttpCode(HttpStatus.OK)
	joinAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	) {
		return this.buyerService.joinAuction(buyer, id);
	}

	@Post('auction/:id')
	retreatFromAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<boolean> {
		return this.buyerService.retreatFromAuction(buyer, id);
	}

	@Post('auction/:id')
	saveAuctionForLater(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<boolean> {
		return this.buyerService.saveAuctionForLater(buyer, id);
	}

	/*--------------------*/
	// Review Behaviors
	@Serialize(ReviewDto)
	@Post('review')
	makeReview(
		@Body() createReviewDto: CreateReviewDto,
		@GetCurrentUserData('_id') buyerId: string,
	): Promise<Review> {
		return this.buyerService.makeReview(createReviewDto, buyerId);
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
