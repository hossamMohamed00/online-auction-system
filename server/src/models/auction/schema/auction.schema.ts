import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AuctionStatus } from '../enums';
import { Item } from 'src/models/items/schema/item.schema';
import { Category } from 'src/models/category/schema/category.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
	@Prop({ required: true, trim: true })
	title: string;

	@Prop({
		required: true,
		type: Types.ObjectId,
		ref: Item.name,
	})
	item: Types.ObjectId;

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
  * The Minimum Bid is equal to the Base price when the Bidding begins.
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

	@Prop({ default: null })
	rejectionMessage: string;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		default: null,
	})
	winningBuyer: Buyer;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
	})
	seller: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		ref: Category.name,
	})
	category: Types.ObjectId;

	@Prop({ type: [{ type: Types.ObjectId, ref: User.name }] }) //* This syntax is very important as the last was not populating all array
	bidders: [Types.ObjectId];

	//* To keep track of all bidders that should be notified when the auction start
	@Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
	waitingBidders: [Types.ObjectId];
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
