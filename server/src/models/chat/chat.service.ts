import { Injectable } from '@nestjs/common';
import { Chat, ChatDocument } from './schema/chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
	constructor(
		@InjectModel(Chat.name)
		private readonly chatModel: Model<ChatDocument>,
	) {}

	/**
	 * @returns List of available chats
	 */
	async getAllChats(): Promise<Chat[]> {
		return await this.chatModel.find();
	}

	/**
	 * Create new chat
	 * @param chat - Chat instance
	 */
	async saveChat({ message, sender, recipient }): Promise<Chat> {
		const createdChat = new this.chatModel({
			message,
			sender,
			recipient,
		});
		await createdChat.save();
		return createdChat;
	}
}
