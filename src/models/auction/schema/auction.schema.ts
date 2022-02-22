import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { AuctionStatus } from '../enums';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Item } from 'src/models/items/schema/item.schema';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Item.name,
    // The below option tells this plugin to always call `populate()` on `item`
    autopopulate: true,
  })
  item: Item;

  @Prop({ required: true, min: 0 })
  initialPrice: number;

  @Prop({ required: true, min: 0, default: null })
  chairCost: number; // The cost of registering to bid.

  @Prop({ min: 0, default: 0 })
  numOfBids: number; // Current number of bids

  /*
  The minimum acceptable amount that is required for a bidder to place a Bid on an Item.
  The Minimum Bid is calculated using the Bidding Increment Rules and the Current Bid.
  For example, if the Current Bid is $100 and the Bid Increment is $10 at the $100 level,
   then the Minimum Bid is $110.
   The Minimum Bid is equal to the Starting Bid when the Bidding begins. Therefore, 
   a Bidder is only required to bid the Starting Bid amount if he/she is the first bidder.
  */
  @Prop({ required: true, min: 0 })
  minimumBidAllowed: number;

  @Prop({ min: 0, default: null })
  highestBidValue: number; // Current highest bid value

  // TODO - Add Buyer who has the highest bid value

  @Prop({ required: true })
  startDate: Date;

  @Prop({ default: null })
  endDate: Date;

  @Prop({ default: null })
  extensionTime: number; // The time (in seconds) by which the auction counter will be increased with each bid. This will be applicable only towards the end of the auction

  @Prop({ enum: AuctionStatus, default: AuctionStatus.Pending })
  status: AuctionStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name, // The below option tells this plugin to always call `populate()` on `seller`
    autopopulate: true,
  })
  seller: User;
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
