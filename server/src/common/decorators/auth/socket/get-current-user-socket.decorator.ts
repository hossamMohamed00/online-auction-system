import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/*
 ? This is a param decorator that extract the user from socket.io
 */

export const GetCurrentUserFromSocket = createParamDecorator(
	async (data: never, context: ExecutionContext) => {
		//* Get socket io client
		const client = context.switchToWs().getClient();

		//* Get user from the client object (attached from socket auth guard )
		console.log('user data is ', client.user);
	},
);
