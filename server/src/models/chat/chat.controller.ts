import { Controller, Get, Param } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';

import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get('/:id')
	@IsPublicRoute()
	myChats(@Param('id') id: string) {
		return this.chatService.findChats(id);
	}

	@Get('/:user1/:user2')
	@IsPublicRoute()
	async FindPrivateChat(
		@Param('user1') user1: string,
		@Param('user2') user2: string,
	) {
		return this.chatService.findPrivateChat(user1, user2);
	}
}
