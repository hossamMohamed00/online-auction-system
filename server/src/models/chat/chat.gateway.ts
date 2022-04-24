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
import { RoomMembersService } from './room-members.service';
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

	@Inject()
	private roomMembersServices: RoomMembersService;

	//* Attaches native Web Socket Server to a given property.
	@WebSocketServer()
	server: Server;

	//? Create logger instance
	private logger: Logger = new Logger('ChatGateway');

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
		//* Get the user
		const user: User = await this.chatService.getConnectedClientUserObject(
			client,
		);

		//* Add the member to the list of all members
		this.roomMembersServices.addMember({
			socketId: client.id,
			email: user.email,
		});

		this.logger.log('New User Connected 👍🏻, with email: ' + user.email);
	}

	/**
	 * Fires when the client be disconnected
	 */
	async handleDisconnect(client: Socket) {
		//* Remove the member from the list of all members
		const removedMember = this.roomMembersServices.removeMember(client.id);
		this.logger.log('User Disconnected 👎🏻, with email: ' + removedMember.email);
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

		this.logger.log('Chat history loaded and emitted to user ✔✔');
	}

	/*
	 * a handler that will subscribe to the send_message messages and respond to the user with the exact same data.
	 */
	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('new-message-to-server')
	async listenForMessages(
		@MessageBody() data: { message: string; receiverEmail: string },
		@GetCurrentUserFromSocket() user: User,
		@ConnectedSocket() client: Socket,
	) {
		// Display log message
		this.logger.log(
			'New message recieved ❤ from ' + user.email + ' to ' + data.receiverEmail,
		);

		//* Handle the incoming message
		const message = await this.chatService.handleNewMessage(
			user.email,
			data.receiverEmail,
			data.message,
		);

		// Prepare to send the message to the clients
		const messageTo = [client.id];

		//* Find the receiver socketId if he is online
		const receiverSocketId = this.roomMembersServices.getMemberSocketId(
			data.receiverEmail,
		);

		// Append the receiverSocketId to the list to receive the message
		if (receiverSocketId) {
			messageTo.push(receiverSocketId);
		}

		console.log(messageTo);

		//* Emit the message
		this.server.to(messageTo).emit('new-message-to-client', message);
	}
}
