import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
	@Prop({ required: true })
	reason: string;

	@Prop({ required: true })
	from: string;

	@Prop({ required: true })
	in: string;

	@Prop({ default: false })
	IsRead: boolean;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
