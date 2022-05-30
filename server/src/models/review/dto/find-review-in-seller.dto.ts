import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';
export class FindReviewInSeller {
	@IsMongoId()
	sellerId: ObjectId;
}
