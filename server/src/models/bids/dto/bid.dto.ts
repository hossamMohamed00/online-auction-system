import { Expose, Transform } from 'class-transformer';
import { IsNumberString, IsString } from 'class-validator';
import { SerializeIt } from 'src/common/utils';
import { AuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { BuyerDto } from 'src/models/users/buyer/dto';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';

export class BidDto {
	@Expose()
	@Transform(({ obj }) => {
		return obj.user.email;
	})
	userEmail: string;

	@Expose()
	amount: number;

	@Expose()
	createdAt: Date;
}
