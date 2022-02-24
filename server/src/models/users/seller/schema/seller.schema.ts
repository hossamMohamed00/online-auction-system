import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SellerDocument = Seller & Document;

/**
 * This schema contains only properties that is specific to the Seller,
 *  as the rest of properties will be inherited from the shared-user
 */

@Schema()
export class Seller {
  @Prop({ required: true, default: true })
  isSeller: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

/* ------------------------ */
//? Setting up a virtual property for auctions
//* ==> It's not actual data stored in database.
//* ==> It's a relationship between entities.
SellerSchema.virtual('auctions', {
  ref: 'Auction',
  localField: '_id',
  foreignField: 'seller',
});
