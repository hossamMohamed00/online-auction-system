import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto';
import { Item, ItemDocument } from './schema/item.schema';

@Injectable()
export class ItemService {
	constructor(
		@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
	) {}

	/**
	 * Create new item
	 * @param itemData - The item data to be created
	 * @returns Created item instance
	 */
	async create(itemData: CreateItemDto) {
		//* Create new item
		const createdItem = new this.itemModel(itemData);

		//* Save the item
		await createdItem.save();

		return createdItem;
	}
}
