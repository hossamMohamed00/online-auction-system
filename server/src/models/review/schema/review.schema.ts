import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
	@Prop({ required: true })
	message: string;
	@Prop({ required: true })
	review: number;
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: User.name,
		required: true,
	})
	seller: User;
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: User.name,
		required: true,
	})
	buyer: User;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
