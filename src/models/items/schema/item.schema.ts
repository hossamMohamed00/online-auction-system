import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Category } from 'src/models/category/schema/category.schema';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  cost: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
