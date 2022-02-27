import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
 ? This is a param decorator that extract the user from socket.io
 */

export const GetCurrentUserFromSocket = createParamDecorator(
	async (data: never, context: ExecutionContext) => {
		//* Get socket io client
		const client = context.switchToWs().getClient();

		if (!client.user) {
			client.emit('new-message-to-client', {
				message: 'You are not logged in ❌',
			});

			return null;
		}

		//* Get user from the client object (attached from socket auth guard )
		return client.user;
	},
);
