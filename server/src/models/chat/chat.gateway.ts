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
	 * a handler that will subscribe to the send_message messages and respond to the user with the exact same data.
	 */
	@SubscribeMessage('send_message')
	handleEvent(@MessageBody() data: string) {
		this.server.sockets.emit('receive_message', data);
	}

	handleConnection(client: any, ...args: any[]) {
		console.log('User connected');
	}

	handleDisconnect(client: any) {
		console.log('User disconnected');
	}

	afterInit(server: any) {
		console.log('Socket is live');
	}
}
