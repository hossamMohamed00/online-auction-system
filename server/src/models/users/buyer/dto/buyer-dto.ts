import { Expose, Transform } from 'class-transformer';
import { SerializeIt } from 'src/common/utils';
import { AuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { UserDto } from '../../shared-user/dto';

export class BuyerDto extends UserDto {
	@Expose()
	@Transform(({ obj }) => {
		return SerializeIt(AuctionDto, obj.joinedAuctions);
	})
	joinedAuctions: Auction[];

	@Expose()
	@Transform(({ obj }) => {
		return SerializeIt(AuctionDto, obj.savedAuctions);
	})
	savedAuctions: Auction[];
}
