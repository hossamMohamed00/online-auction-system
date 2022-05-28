import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
	@Prop({ required: true, minlength: 5, maxlength: 100 })
	reason: string;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	})
	from: Seller | Buyer;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	})
	in: Seller | Buyer;

	@Prop({ default: false })
	markedAsRead: boolean; // To check whether admin read the complaints or not
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
