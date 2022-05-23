import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
	@IsNotEmpty()
	@IsMongoId()
	_id: string;
}
