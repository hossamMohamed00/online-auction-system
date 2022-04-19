import { UseGuards, Logger, Inject } from '@nestjs/common';
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UsersService } from '../users/shared-user/users.service';
import { SocketAuthGuard } from 'src/common/guards';
import { User } from '../users/shared-user/schema/user.schema';
import { GetCurrentUserFromSocket } from './../../common/decorators/';
import { ChatService } from './chat.service';
import { Chat } from './schema/chat.schema';

/**
 * Its job is to receive and send messages.
 */
@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class ChatGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	@Inject()
	private chatService: ChatService;

	private readonly usersService: UsersService;

	//* Attaches native Web Socket Server to a given property.
	@WebSocketServer()
	server: Server;

	//? Create logger instance
	private logger: Logger = new Logger('ChatGateway');

	//* Keep track of connections
	private count: number = 0;

	/**
	 * Run when the service initialises
	 */
	afterInit(server: any) {
		this.logger.log('MessageGateway initialized ⚡⚡');
	}

	/**
	 * Fires when the client be connected
	 */
	async handleConnection(client: any, ...args: any[]) {
		this.count++;
		this.logger.log('New User Connected 👍🏻');
		const messages: Chat[] = await this.chatService.getAllClientChatHistory();

		client.emit('all-messages-to-client', messages);
	}

	/**
	 * Fires when the client be disconnected
	 */
	handleDisconnect(client: any) {
		this.count--;
		this.logger.log('User Disconnected 👎🏻');
	}

	/*-------------------------------------------*/
	/*
	 * a handler that will subscribe to the send_message messages and respond to the user with the exact same data.
	 */
	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('new-message-to-server')
	async listenForMessages(
		@MessageBody() data: { message: string; recipient: string },
		@GetCurrentUserFromSocket() user: User,
	) {
		if (user) {
			this.logger.log('New message recieved ❤');
			const chat = this.chatService.findPrivateChat(user.name, data.recipient);

			const chatData = {
				message: data.message,
				sender: user.name,
				recipient: data.recipient,
			};

			const message: Chat = await this.chatService.saveChat(chatData);
			this.server.emit('new-message-to-client', { message });
		} else {
			this.server.emit('new-message-to-client', {
				message: 'You are not logged in ❌',
			});
		}
	}
}
