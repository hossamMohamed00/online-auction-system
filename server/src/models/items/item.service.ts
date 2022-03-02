import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto';
import { UpdateItemDto } from './dto/update-item.dto';
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

	/**
	 * Update an item data
	 * @param itemData - New item data
	 * @return true if the item was updated, false otherwise
	 */
	async update(_id: string, updateItemDto: UpdateItemDto): Promise<boolean> {
		//* Omit the _id
		delete updateItemDto._id;

		const updatedItem = await this.itemModel.findByIdAndUpdate(
			_id,
			updateItemDto,
			{
				new: true,
			},
		);

		if (updatedItem) return true;

		return false;
	}

	/**
	 * Remove an item from the database by id
	 * @param _id - Item id to be removed
	 * @returns true if item was removed, false otherwise
	 */
	async remove(_id: string): Promise<boolean> {
		const removedItem = await this.itemModel.findByIdAndRemove(_id);
		if (!removedItem) return false;
		return true;
	}
}
