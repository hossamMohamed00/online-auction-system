import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../shared-user/schema/user.schema';

export type BuyerDocument = Buyer & Document;

/**
 * This schema contains only properties that is specific to the Buyer,
 *  as the rest of properties will be inherited from the shared-user
 */

@Schema()
export class Buyer extends User {
	@Prop({ required: true, default: true })
	isBuyer: boolean;

	//* To keep track of stripe customer id to enable wallet
	@Prop({ required: true, unique: true })
	stripeCustomerId: string;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
