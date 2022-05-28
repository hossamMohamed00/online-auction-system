import { IsMongoId } from 'class-validator';

export class FindReviewInSeller {
	@IsMongoId()
	sellerId: string;
}
