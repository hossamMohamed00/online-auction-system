import { Expose, Transform } from 'class-transformer';
import { SerializeIt } from 'src/common/utils';
import { BuyerDto } from 'src/models/users/buyer/dto';

export class ReviewDto {
	@Expose()
	message: string;

	@Expose()
	review: number;

	@Expose()
	@Transform(({ obj }) => {
		//* Serialize  the item object to remove the sensitive data
		return SerializeIt(BuyerDto, obj.buyer);
	})
	buyer: BuyerDto;

	@Expose()
	createdAt: string;
}
