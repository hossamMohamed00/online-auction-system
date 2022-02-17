import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  @Prop({ required: true, default: true })
  isSeller: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
