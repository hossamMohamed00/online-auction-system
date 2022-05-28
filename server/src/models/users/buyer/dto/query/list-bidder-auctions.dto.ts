import { IsNotEmpty, IsEnum } from 'class-validator';
import { BidderAuctionsEnumQuery } from '../../enums';

export class ListBidderAuctionsQueryDto {
	@IsEnum(BidderAuctionsEnumQuery, {
		message: 'populateField must be either [joinedAuctions or savedAuctions]',
	})
	@IsNotEmpty()
	populateField: BidderAuctionsEnumQuery;
}
