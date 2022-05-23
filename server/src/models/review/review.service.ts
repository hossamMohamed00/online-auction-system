import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { retry } from 'rxjs';
import { Buyer } from '../users/buyer/schema/buyer.schema';
import { Seller } from '../users/seller/schema/seller.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schema/review.schema';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly ReviewModel: Model<ReviewDocument>,
	) {}
	// Create New Review
	async create(createreviewDto: CreateReviewDto, buyer: Buyer, seller: Seller) {
		const IsReviewedBefor = await this.ReviewModel.findOne({
			seller,
			buyer,
		});
		if (IsReviewedBefor) {
			throw new BadRequestException('You Have Recied this Seller before 😁.');
		}
		const createdReview: ReviewDocument = new this.ReviewModel({
			message: createreviewDto.message,
			review: createreviewDto.review,
			seller,
			buyer,
		});

		await createdReview.save();

		return createdReview;
	}
	async Edit(
		updateReviewDto: UpdateReviewDto,
		ReviewId: string,
		buyerid: string,
	) {
		delete updateReviewDto._id;
		const isExists = await this.isExists(ReviewId, buyerid);
		if (!isExists) {
			throw new BadRequestException('not reviewed form You ❌');
		}
		const review = await this.ReviewModel.findByIdAndUpdate(
			ReviewId,
			updateReviewDto,
			{
				new: true,
			},
		);
		if (review) {
			return review;
		}
	}
	async ReviewInSeller(seller: Seller, buyer: Buyer) {
		const review = await this.ReviewModel.findOne({ seller, buyer });
		return review;
	}
	async myreviews(seller: Seller) {
		const review = await this.ReviewModel.find({ seller });
		return review;
	}
	async remove(ReviewId: string, buyerid: string) {
		const review: ReviewDocument = await this.ReviewModel.findOne({
			_id: ReviewId,
			buyer: buyerid,
		});
		if (!review) {
			throw new NotFoundException('review not found❌');
		}
		await review.remove();
		return review;
	}
	async isExists(reviewid: string, buyerid: string): Promise<boolean> {
		const count = await this.ReviewModel.countDocuments({
			_id: reviewid,
			buyer: buyerid,
		});

		return count > 0;
	}
}
