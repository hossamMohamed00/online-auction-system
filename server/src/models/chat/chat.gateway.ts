import { UseGuards, Logger, Inject } from '@nestjs/common';
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthGuard } from 'src/common/guards';
import { User, UserDocument } from '../users/shared-user/schema/user.schema';
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

	//* Attaches native Web Socket Server to a given property.
	@WebSocketServer()
	server: Server;

	//? Create logger instance
	private logger: Logger = new Logger('ChatGateway');

	//* Keep track of online users
	private users: any = [];

	/**
	 * Run when the service initialises
	 */
	afterInit(server: any) {
		this.logger.log('MessageGateway initialized ⚡⚡');
	}

	/**
	 * Fires when the client be connected
	 */
	async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
		this.logger.log('New User Connected 👍🏻');

		// Push the socket id to the users array
		this.users.push(client.id);
	}

	/**
	 * Fires when the client be disconnected
	 */
	handleDisconnect(client: any) {
		this.logger.log('User Disconnected 👎🏻');
	}

	/*-------------------------------------------*/

	/*
	 * Get the chat history between the client and specific receiver
	 */
	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('get-chat-history')
	async getClientChatHistory(
		@ConnectedSocket() client: Socket,
		@MessageBody() data: { receiverEmail: string },
		@GetCurrentUserFromSocket() user: User,
	) {
		// Display log message
		this.logger.log(
			'Try to load chat-history between ' +
				user.email +
				' and ' +
				data.receiverEmail,
		);

		//? Get chat history of the client with the given receiver
		const chatHistory: Chat = await this.chatService.getAllClientChatHistory(
			user.email,
			data.receiverEmail,
		);

		//* Send the chat history to the client back
		client.emit('chat-history-to-client', chatHistory);
	}

	/*
	 * a handler that will subscribe to the send_message messages and respond to the user with the exact same data.
	 */
	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('new-message-to-server')
	async listenForMessages(
		@MessageBody() data: { message: string; receiverEmail: string },
		@GetCurrentUserFromSocket() user: User,
	) {
		// Display log message
		this.logger.log('New message recieved ❤');

		//* Handle the incoming message
		this.chatService.handleNewMessage(
			user.email,
			data.receiverEmail,
			data.message,
		);

		//TODO: Emit the message to private room
		let message: string = data.message;
		this.server.emit('new-message-to-client', { message });
	}
}
