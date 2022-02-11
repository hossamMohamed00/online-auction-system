import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
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

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
  sellerId: Types.ObjectId;

  @Prop({ enum: Status, default: Status.Pending })
  status: string;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
