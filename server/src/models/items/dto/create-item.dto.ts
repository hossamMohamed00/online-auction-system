import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';
import {
	HasMimeType,
	IsFile,
	MaxFileSize,
	MemoryStoredFile,
} from 'nestjs-form-data';

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

	@IsNotEmpty({ message: 'Please provide valid item image 📷' })
	@IsFile()
	@MaxFileSize(1e6)
	@HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/gif'])
	// image: MemoryStoredFile;
	image: any;
}
