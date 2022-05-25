import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schema/review.schema';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly reviewModel: Model<ReviewDocument>,
	) {}
	// Create New Review
	async create(createReviewDto: CreateReviewDto, buyer: string) {
		//? Ensure that the bidder not already reviewed the seller
		const isAlreadyReviewed = await this.reviewModel.findOne({
			seller: createReviewDto.seller,
			buyer,
		});

		if (isAlreadyReviewed) {
			throw new BadRequestException('You Have reviewed this Seller before 😁.');
		}

		//? Create New Review
		const createdReview: ReviewDocument = new this.reviewModel({
			...createReviewDto,
			buyer,
		});

		//* Save Review
		await createdReview.save();

		return createdReview;
	}

	async updateReview(
		updateReviewDto: UpdateReviewDto,
		reviewId: string,
		buyerId: string,
	) {
		const isExists = await this.isExist(reviewId, buyerId);

		if (!isExists) {
			throw new BadRequestException('Not reviewed form You ❌');
		}

		const review = await this.reviewModel.findByIdAndUpdate(
			reviewId,
			updateReviewDto,
			{
				new: true,
			},
		);

		return review;
	}

	/**
	 * Get buyer review in a seller
	 * @param sellerId
	 * @param buyerId
	 * @returns review if exists
	 */
	async getReviewInSeller(sellerId: string, buyerId: string) {
		const review = await this.reviewModel.findOne({ sellerId, buyerId });
		return review;
	}

	/**
	 * Get all reviews for one seller
	 * @returns List of all reviews submitted in a seller
	 */
	async getSellerReviews(sellerId: string) {
		//* Get the reviews of the seller
		const reviews: ReviewDocument[] = await this.reviewModel
			.find({
				seller: String(sellerId),
			})
			.populate('buyer');

		return reviews;
	}

	/**
	 * Remove a review from the database
	 * @param reviewId
	 * @param buyerId
	 * @returns review if removed
	 */
	async remove(reviewId: string, buyerId: string) {
		const review: ReviewDocument = await this.reviewModel.findOneAndRemove({
			_id: reviewId,
			buyer: buyerId,
		});

		if (!review) {
			throw new NotFoundException('Review not found❌');
		}

		return review;
	}

	/**
	 * Check if the review exists in the database or not
	 * @param reviewId
	 * @param buyerId
	 * @returns Promise<boolean>
	 */
	async isExist(reviewId: string, buyerId: string): Promise<boolean> {
		//* Count the number of reviews with the given id and buyer id
		const count = await this.reviewModel.countDocuments({
			_id: reviewId,
			buyer: buyerId,
		});

		return count > 0;
	}
}
