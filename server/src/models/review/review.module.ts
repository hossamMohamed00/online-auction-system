import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './schema/review.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
	],
	providers: [ReviewService],
	exports: [ReviewService],
})
export class ReviewModule {}
