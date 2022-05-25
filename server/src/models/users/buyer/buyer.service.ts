import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from 'src/models/review/dto/create-review.dto';
import { UpdateReviewDto } from 'src/models/review/dto/update-review.dto';
import { ReviewService } from 'src/models/review/review.service';
import { Review, ReviewDocument } from 'src/models/review/schema/review.schema';
import { SellerDocument } from '../seller/schema/seller.schema';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly reviewService: ReviewService,
	) {}
	private logger: Logger = new Logger('BuyerService 👋🏻');

	async create(body: any) {
		const buyer = new this.buyerModel(body);
		await buyer.save();

		return buyer;
	}

	async findAll() {
		const buyers = await this.buyerModel.find().exec();
		return buyers;
	}

	/*------------------------------*/
	/**
	 * Create new review in seller
	 * @param createReviewDto
	 * @param buyerId
	 * @param sellerId
	 * @returns created review
	 */
	async makeReview(
		createReviewDto: CreateReviewDto,
		buyerId: string,
	): Promise<Review> {
		this.logger.log(
			'Creating new review in' + createReviewDto.seller + ' from ' + buyerId,
		);

		return this.reviewService.create(createReviewDto, buyerId);
	}

	async editReview(
		id: string,
		UpdateReviewDto: UpdateReviewDto,
		buyerId: string,
	): Promise<Review> {
		return this.reviewService.updateReview(UpdateReviewDto, id, buyerId);
	}

	/**
	 * Remove review by buyer
	 * @param reviewId
	 * @param buyerId
	 * @returns removed review
	 */
	async removeReview(reviewId: string, buyerId: string): Promise<Review> {
		return this.reviewService.remove(reviewId, buyerId);
	}
}
