import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/users/entities/user.schema';
import { Status } from '../enums';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
  @Prop({ required: true, trim: true })
  product: string;

  @Prop({ required: true, min: 0 })
  initialPrice: number;

  @Prop()
  startDate: Date;

  @Prop({ default: null })
  endDate: Date;

  @Prop({ enum: Status, default: Status.Pending })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  seller: User;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
