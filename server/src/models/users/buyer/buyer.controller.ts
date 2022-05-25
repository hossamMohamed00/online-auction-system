import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, IsPublicRoute } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { CreateReviewDto } from 'src/models/review/dto/create-review.dto';
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { UpdateReviewDto } from 'src/models/review/dto/update-review.dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Seller, SellerDocument } from '../seller/schema/seller.schema';
import { BuyerService } from './buyer.service';
import { BuyerDocument } from './schema/buyer.schema';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
	constructor(private readonly buyerService: BuyerService) {}

	@Post()
	@IsPublicRoute()
	createBuyer(@Body() body: any) {
		return this.buyerService.create(body);
	}

	@Get()
	@IsPublicRoute()
	findAll() {
		return this.buyerService.findAll();
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
