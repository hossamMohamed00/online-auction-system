import { IsDate, IsEnum, IsOptional, IsMongoId } from 'class-validator';
import { AuctionStatus } from '../../enums';

export class FilterAuctionQueryDto {
	@IsOptional()
	@IsEnum(AuctionStatus)
	status: AuctionStatus;

	@IsOptional()
	@IsMongoId()
	category: string;
}
