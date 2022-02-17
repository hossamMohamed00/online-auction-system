import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Status } from '../enums';
import { User } from 'src/models/users/shared-user/schema/user.schema';

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
