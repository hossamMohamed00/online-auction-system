import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/models/category/schema/category.schema';
import { ItemStatus } from '../enums/item-status.enum';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ required: true, trim: true })
	shortDescription: string;

	@Prop({ trim: true })
	detailedDescription: string;

	@Prop({ default: 'none' })
	brand?: string;

	@Prop({ required: true, enum: ItemStatus })
	status: ItemStatus;

	@Prop()
	color?: string;

	@Prop()
	investigationLocation?: string; // Location on map

	@Prop({ required: true })
	imageUrl: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
