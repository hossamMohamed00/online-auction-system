import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { AuctionStatus } from '../enums';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Item } from 'src/models/items/schema/item.schema';
import { Category } from 'src/models/category/schema/category.schema';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
	@Prop({ required: true, trim: true })
	title: string;

	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: Item.name,
		//? The below option tells this plugin to always call `populate()` on `item`
		autopopulate: true,
	})
	item: Item;

	@Prop({ required: true, min: 0 })
	basePrice: number; //? Auction starting price

	@Prop({ required: true })
	startDate: Date;

	@Prop({ default: null })
	endDate: Date;

	@Prop({ required: true, min: 0, default: null })
	chairCost: number; //? The cost of registering to bid.

	/*
  ? The minimum acceptable amount that is required for a bidder to place a Bid on an Item.
  ? The Minimum Bid is calculated using the Bidding Increment Rules and the Current Bid.
  * The Minimum Bid is equal to the Starting Bid when the Bidding begins.
  */
	@Prop({ required: true, min: 0 })
	minimumBidAllowed: number;

	@Prop({ min: 0, default: null })
	currentBid: number; //? Current highest bid value

	@Prop({ min: 0, default: 0 })
	bidIncrement: number; //? minimum acceptable amount, calculated from Bidding Increment Rules.

	@Prop({ min: 0, default: 0 })
	numOfBids: number; //? Current number of bids

	@Prop({ default: null })
	extensionTime: number; //? The time (in seconds) by which the auction counter will be increased with each bid. This will be applicable only towards the end of the auction

	@Prop({ enum: AuctionStatus, default: AuctionStatus.Pending })
	status: AuctionStatus;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Buyer.name,
		//? The below option tells this plugin to always call `populate()` on `winningBuyer`
		autopopulate: true,
		default: null,
	})
	winningBuyer: Buyer;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Seller.name,
		//? The below option tells this plugin to always call `populate()` on `seller`
		autopopulate: true,
	})
	seller: Seller;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Category.name,
		autopopulate: true,
	})
	category: Category;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
