import { Expose } from 'class-transformer';

export class ReviewDto {
	@Expose()
	message: string;

	@Expose()
	review: number;
}
