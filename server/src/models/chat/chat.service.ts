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
	async getChats(): Promise<Chat[]> {
		return await this.chatModel.find();
	}

	/**
	 * Create new chat
	 * @param chat - Chat instance
	 */
	async saveChat(chat: Chat): Promise<void> {
		const createdChat = new this.chatModel(chat);
		await createdChat.save();
	}
}
