import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuyerDocument = Buyer & Document;

/**
 * This schema contains only properties that is specific to the Buyer,
 *  as the rest of properties will be inherited from the shared-user 
 */

@Schema()
export class Buyer {
  @Prop({ required: true, default: true })
  isBuyer: boolean;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
