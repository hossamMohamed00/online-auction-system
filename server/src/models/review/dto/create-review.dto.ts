import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateReviewDto {
	@IsNotEmpty()
	@IsString()
	message: string;

	@IsNotEmpty()
	@IsNumber()
	review: Number;
}
