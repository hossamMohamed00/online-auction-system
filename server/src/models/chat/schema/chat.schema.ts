import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
	@Prop({ required: [true, 'Message is required'] })
	message: string;

	@Prop({ required: [true, 'Sender is required'] })
	sender: string;

	@Prop({ required: [true, 'Recipient is required'] })
	recipient: string;

	@Prop({ default: Date.now() })
	createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
