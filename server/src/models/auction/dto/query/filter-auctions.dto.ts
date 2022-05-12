import {
	IsEnum,
	IsOptional,
	IsMongoId,
	IsBooleanString,
} from 'class-validator';
import { AuctionStatusForSearch } from '../../enums';

export class FilterAuctionQueryDto {
	@IsOptional()
	@IsEnum(AuctionStatusForSearch, {
		message: 'Sorry, status must be one of [upcoming, ongoing, closed] 👀',
	})
	status: AuctionStatusForSearch;

	@IsOptional()
	@IsMongoId()
	category: string;

	@IsOptional()
	@IsBooleanString()
	populate: string;
}
