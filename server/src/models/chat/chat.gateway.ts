import { UseGuards } from '@nestjs/common';
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
import { SocketAuthGuard } from 'src/common/guards';
import { User } from '../users/shared-user/schema/user.schema';
import { GetCurrentUserFromSocket } from './../../common/decorators/';

/**
 * Its job is to receive and send messages.
 */
@WebSocketGateway()
export class ChatGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	@WebSocketServer()
	server: Server;

	/**
	 * Run when the service initialises
	 */
	afterInit(server: any) {
		console.log('Socket.IO Initialized');

		//* Add the request object to the socket to be accessed via context.switchToWs().getClient();
		// server.on('connection', (socket, request) => {
		// 	socket['request'] = request;
		// });
	}

	/**
	 * a handler that will subscribe to the send_message messages and respond to the user with the exact same data.
	 */
	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('send_message')
	listenForMessages(
		@MessageBody() content: string,
		@GetCurrentUserFromSocket() user: User,
	) {
		console.log({ user });

		// this.server.sockets.emit('receive_message', content);
	}

	/**
	 * Fires when the client be connected
	 */
	handleConnection(client: any, ...args: any[]) {
		console.log('User connected');
	}

	/**
	 * Fires when the client be disconnected
	 */
	handleDisconnect(client: any) {
		console.log('User disconnected');
	}
}
