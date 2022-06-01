import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Auction } from 'src/models/auction/schema/auction.schema';

export type BidDocument = Bid & Document;

@Schema({ timestamps: true })
export class Bid {
	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		autopopulate: true,
		required: true,
	})
	user: Buyer;

	@Prop({
		type: Types.ObjectId,
		ref: Auction.name,
		autopopulate: true,
		required: true,
	})
	auction: Auction;

	@Prop({ required: true, min: 0 })
	amount: number;

	@Prop({ required: true, default: new Date() })
	createdAt: Date;
}

export const BidSchema = SchemaFactory.createForClass(Bid);
