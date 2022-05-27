import { Expose, Transform } from 'class-transformer';
import { SerializeIt } from 'src/common/utils';
import { AuctionDto } from 'src/models/auction/dto';
import { SellerDto } from './seller-dto';

export class SellerProfileDto {
	@Expose()
	@Transform(({ obj }) => {
		console.log(obj.seller);

		return SerializeIt(SellerDto, obj.seller);
	})
	seller: SellerDto;

	@Expose()
	@Transform(({ obj }) => {
		return SerializeIt(AuctionDto, obj.auctions);
	})
	auctions: any;
}
