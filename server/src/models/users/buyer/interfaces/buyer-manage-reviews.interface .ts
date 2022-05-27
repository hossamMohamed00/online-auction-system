import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateReviewDto, UpdateReviewDto } from 'src/models/review/dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Buyer } from '../schema/buyer.schema';

export interface BuyerReviewsBehaviors {
	//* Submit new review
	submitReviewOnSeller(
		createReviewDto: CreateReviewDto,
		buyerId: string,
	): Promise<Review>;

	editReview(
		id: MongoObjectIdDto,
		updateReviewDto: UpdateReviewDto,
		buyerId: string,
	): Promise<Review>;

	deleteReview(id: MongoObjectIdDto, buyerId: string): Promise<Review>;
}
