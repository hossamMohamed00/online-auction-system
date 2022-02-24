import { Type } from 'class-transformer';
import {
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

import { ItemStatus } from '../enums/item-status.enum';
export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	shortDescription: string;

	@IsString()
	@IsOptional()
	detailedDescription: string;

	@IsString()
	@IsOptional()
	brand: string;

	@IsEnum(ItemStatus)
	status: ItemStatus;

	@IsString()
	@IsOptional()
	color: string;

	@IsString()
	@IsOptional()
	investigationLocation?: string; // Location on map
}
