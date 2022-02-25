import { ChatService } from './chat.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schema/chat.schema';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
	],
	controllers: [],
	providers: [ChatService, ChatGateway],
})
export class ChatModule {}
