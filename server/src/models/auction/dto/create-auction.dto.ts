import { Type } from 'class-transformer';
import {
	IsDate,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongoose';

import { CreateItemDto } from 'src/models/items/dto';

export class CreateAuctionDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@Type(() => CreateItemDto)
	@ValidateNested() // To validate nested objects
	item: CreateItemDto;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	initialPrice: number;

	@IsDate()
	@Type(() => Date)
	startDate: Date;

	@IsMongoId() // To validate nested objects
	category: ObjectId;
}
