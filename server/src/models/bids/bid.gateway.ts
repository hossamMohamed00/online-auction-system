import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	ConnectedSocket,
	WsException,
} from '@nestjs/websockets';
import { BidService } from './bid.service';
import { SocketAuthGuard } from 'src/common/guards';
import { Buyer } from '../users/buyer/schema/buyer.schema';
import { GetCurrentUserFromSocket } from 'src/common/decorators';
import { JoinAuctionDto, PlaceBidDto } from './dto';
import { AuctionRoomService } from './auction-room.service';

/**
 * Its job is to handle the bidding process.
 */
@WebSocketGateway({
	namespace: 'auction/bidding', // To be access as localhost:8000/auction/bidding
	cors: {
		origin: '*',
	},
})
export class BidGateway
	implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
	@Inject()
	private bidService: BidService;

	@Inject()
	private auctionRoomService: AuctionRoomService;

	//* Attaches native Web Socket Server to a given property.
	@WebSocketServer()
	server: Server;

	//? Create logger instance
	private logger: Logger = new Logger(BidGateway.name);

	/**
	 * Run when the service initialises
	 */
	afterInit(server: any) {
		this.logger.log('BidGateway initialized ⚡⚡');
	}

	/**
	 * Fires when the client be connected
	 */
	async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
		console.log('Bidder connected');

		// this.logger.log('New Bidder Connected 👍🏻, with email: ' + user.email);
	}

	handleDisconnect(client: Socket) {
		//* Remove the bidder from the list
		const removedBidder = this.auctionRoomService.removeBidder(client.id);

		if (removedBidder) {
			this.logger.log(
				'Bidder Disconnected 👎🏻, with email: ' + removedBidder.email,
			);

			this.server
				.to(removedBidder.room)
				.emit('message-to-client', 'With sorry, bidder disconnected 😑');
		}
	}

	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('join-auction')
	handleJoinAuction(
		@ConnectedSocket() client: Socket,
		@MessageBody() { auctionId }: JoinAuctionDto,
		@GetCurrentUserFromSocket() bidder: Buyer,
	) {
		if (!auctionId) {
			throw new WsException('You must provide valid auction id 😉');
		}

		this.logger.debug(
			"'" + bidder.email + "' want to join auction with id '" + auctionId + "'",
		);

		//? Add the bidder to the list
		const addedBidder = this.auctionRoomService.addBidder({
			socketId: client.id,
			email: bidder.email,
			room: auctionId,
		});

		if (!addedBidder) {
			throw new WsException(
				'Cannot add ' + bidder.name + ' to this auction right now!',
			);
		}

		//* Join the bidder to the room
		client.join(addedBidder.room);

		//* Send greeting messages
		client.emit('message-to-client', {
			message: 'Welcome ' + bidder.name + ', now you can start bidding 🐱‍🏍💲',
		});

		//* Send message to all room members except this client
		client.broadcast
			.to(addedBidder.room)
			.emit('message-to-client', 'Ooh, new bidder joined the auction 👏🏻⚡⚡');
	}

	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('place-bid')
	handlePaceBid(
		@ConnectedSocket() client: Socket,
		@MessageBody() { bidValue }: PlaceBidDto,
		@GetCurrentUserFromSocket() bidder: Buyer,
	) {
		const savedBidder = this.auctionRoomService.getBidderRoom(client.id);
		if (!savedBidder) {
			throw new WsException('You are not in this auction room ❌');
		}

		this.server
			.to(savedBidder.room)
			.emit('new-bid', { message: 'New bid accepted ✔', value: bidValue });

		//TODO: Check if valid bid

		//TODO: Save the bid
	}
}
