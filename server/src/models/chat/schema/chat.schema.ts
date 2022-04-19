import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
	@Prop({ required: [true, 'Message is required'] })
	messages: [{
		message:{type : string}
		
	}

	];


	@Prop({ required: [true, 'User1 is required'] })
	User1: string;

	@Prop({ required: [true, 'User2 is required'] })
	User2: string;


	@Prop({ default: Date.now() })
	createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
