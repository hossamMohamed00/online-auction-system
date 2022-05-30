import { IsMongoId, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
export class FindReviewInSeller {
	@IsString()
	sellerId: string;
}
