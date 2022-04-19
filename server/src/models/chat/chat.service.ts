import { Injectable, UseGuards } from '@nestjs/common';
import { Chat, ChatDocument } from './schema/chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MESSAGES } from '@nestjs/core/constants';
import { SocketAuthGuard } from 'src/common/guards';

@Injectable()
export class ChatService {
	constructor(
		@InjectModel(Chat.name)
		private readonly chatModel: Model<ChatDocument>,
	) {}

	/**
	 * @returns List of available chats
	 */
	async getAllClientChatHistory(): Promise<Chat[]> {
		return await this.chatModel.find();
	}
	async findAll() {
		const chats = await this.chatModel.find().exec();
		return chats;
	}
	async findChats(name: string) {
		const chat = await this.chatModel.find({
			$or: [{ User1: name }, { User2: name }],
		});
		return chat;
	}

	async findPrivateChat(User1: string, User2: string): Promise<ChatDocument> {
		const chat = await this.chatModel.findOne({ User1: User1, User2: User2 });
		if (chat) {
			return chat;
		} else {
			const chat = await this.chatModel.findOne({ User1: User2, User2: User1 });
			return chat;
		}
	}
	async updateChat(chat: ChatDocument, message: any): Promise<Chat> {
		chat.messages.push(message);
		return chat;
	}

	/**
	 * Save chatr id exists or create new one
	 * @param chat - Chat instance
	 */
	async saveChat({ message, sender, recipient }): Promise<Chat> {
		const mychat = await this.findPrivateChat(sender, recipient);
		if (mychat) {
			const newmessage = sender.concat(': ', message);
			this.updateChat(mychat, newmessage);
			await mychat.save();
		} else {
			const createdChat = new this.chatModel();
			const newmessage = sender.concat(': ', message);
			createdChat.messages.push(newmessage);
			createdChat.User1 = sender;
			createdChat.User2 = recipient;
			await createdChat.save();
			return createdChat;
		}
	}
}
