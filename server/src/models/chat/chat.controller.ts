import { Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards,Request } from '@nestjs/common';
import { GetCurrentUserFromSocket, IsPublicRoute } from 'src/common/decorators';

import { User } from '../users/shared-user/schema/user.schema';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
	
    constructor(private readonly ChatService: ChatService) {}

    @Get('/:id')
 	@IsPublicRoute()
	mychats(@Param('id') id: string,) {	
		return this.ChatService.findchats(id)
	}
	@Get('/:user1/:user2')
	@IsPublicRoute()
	async FindPrivateChat(@Param('user1') user1: string, @Param('user2') user2: string){
		return this.ChatService.findpraivateChat(user1, user2);
	}
	
}
