import { Type } from 'class-transformer';
import {
	IsDate,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsString,
	Max,
	Min,
	ValidateNested,
} from 'class-validator';

export class ExtendAuctionTimeDto {
	@IsNumber()
	@Min(0)
	@Max(30)
	days: number;

	@IsNumber()
	@Min(0)
	@Max(12)
	hours: number;

	@IsNumber()
	@Min(0)
	@Max(60)
	minutes: number;
}
