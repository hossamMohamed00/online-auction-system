import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Auction } from 'src/models/auction/schema/auction.schema';
import { User } from '../../shared-user/schema/user.schema';

export type BuyerDocument = Buyer & Document;

/**
 * This schema contains only properties that is specific to the Buyer,
 *  as the rest of properties will be inherited from the shared-user
 */

@Schema()
export class Buyer extends User {
	//* To keep track of stripe customer id to enable wallet
	@Prop({ required: true, unique: true })
	stripeCustomerId: string;

	//* To keep track of joined auctions
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Auction.name }] })
	joinedAuctions: Auction[];
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
