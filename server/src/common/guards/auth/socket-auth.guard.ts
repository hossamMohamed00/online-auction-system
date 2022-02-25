import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/models/auth/auth.service';

/**
 * Extract the access token from the socket io client
 * Search for the user
 * Attach the user object into the client object
 * always pass the request
 */

@Injectable()
export class SocketAuthGuard implements CanActivate {
	//* Inject auth service
	constructor(private readonly authService: AuthService) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		//* Get socket io client
		const client = context.switchToWs().getClient();

		//* Extract the headers
		const handshakeHeaders = client.handshake.headers;

		//* Extract the access token
		const accessToken = handshakeHeaders.authorization
			.replace('Bearer', '')
			.trim();

		//TODO Get the user
		const user = this.authService.getUserFromJWT(accessToken);

		//* Attach the user to the client object to be accessed via get user from socket decorator
		client.user = user;

		return true;
	}
}
