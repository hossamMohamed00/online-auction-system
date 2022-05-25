import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
	@Prop({ required: true })
	reason: string;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	})
	from: User;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	})
	in: User;

	@Prop({ default: false })
	IsRead: boolean;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
