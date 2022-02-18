import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Status } from '../enums';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Item } from 'src/models/items/schema/item.schema';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Item.name,
  })
  item: Item;

  @Prop({ required: true, min: 0 })
  initialPrice: number;

  @Prop({ required: true, min: 0 })
  chairCost: number; // The cost of registering to bid.

  @Prop()
  startDate: Date;

  @Prop({ default: null })
  endDate: Date;

  @Prop({ default: null })
  extensionTime: number; // The time (in seconds) by which the auction counter will be increased with each bid. This will be applicable only towards the end of the auction

  @Prop({ enum: Status, default: Status.Pending })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  seller: User;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
