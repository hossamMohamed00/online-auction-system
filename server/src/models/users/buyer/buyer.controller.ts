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
	@Post('review')
	makereview(
		@Body() data: { reviewdto: CreateReviewDto; seller: SellerDocument },
		@GetCurrentUserData() buyer: BuyerDocument,
	): Promise<Review> {
		return this.buyerService.MakeReviw(data.reviewdto, buyer, data.seller);
	}
	@Patch('review/:id')
	EditReview(
		@Param() { id }: MongoObjectIdDto,
		@Body() data: { updatereviewdto: UpdateReviewDto },
		@GetCurrentUserData('_id') buyerid: string,
	): Promise<Review> {
		return this.buyerService.Edit(id, data.updatereviewdto, buyerid);
	}
	@Delete('review/:id')
	DeleteReview(
		@Param() { id }: MongoObjectIdDto,
		@GetCurrentUserData('_id') buyerid: string,
	): Promise<Review> {
		return this.buyerService.removereview(id, buyerid);
	}
}
