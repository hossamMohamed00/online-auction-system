import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ObjectId } from 'mongoose';
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
import { JoinOrLeaveAuctionDto, PlaceBidDto } from './dto';
import { AuctionRoomService } from './auction-room.service';
import { AuctionsService } from '../auction/auctions.service';
import { BuyerService } from '../users/buyer/buyer.service';
import { Auction } from '../auction/schema/auction.schema';
import { AuctionStatus } from '../auction/enums';

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

	@Inject()
	private auctionService: AuctionsService;

	@Inject()
	private buyerService: BuyerService;

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
		//* Check if the client already in auction, to add him to the room
		//* Get the user
		const bidder = await this.bidService.getConnectedClientUserObject(client);

		//* Get the auctions that the bidder involved in
		const bidderAuctions: Auction[] = await this.buyerService.listMyAuctions(
			bidder._id,
		);

		//* Loop over the auctions and keep track to those still ongoing
		const auctionsToBeJoined: ObjectId[] = [];
		bidderAuctions.forEach((auction: Auction) => {
			if (auction.status === AuctionStatus.OnGoing) {
				auctionsToBeJoined.push(auction._id);
			}
		});

		//? Join the auctions if exists
		if (auctionsToBeJoined) {
			//* Add the bidder to the auction's rooms
			auctionsToBeJoined.forEach(auctionId => {
				//* Join the client to auction room
				client.join(auctionId.toString());
				this.auctionRoomService.addBidder({
					socketId: client.id,
					userId: bidder._id,
					email: bidder.email,
					room: String(auctionId),
				});

				//* Send greeting messages
				client.emit('message-to-client', {
					message:
						'Welcome ' + bidder.name + ', now you can start bidding 🐱‍🏍💲',
					system: true, // To be used to identify the message as system message
				});

				//* Send message to all room members except this client
				client.broadcast.to(auctionId.toString()).emit('message-to-client', {
					message: 'Ooh, new bidder joined the auction 👏🏻⚡⚡',
					system: true, // To be used to identify the message as system message
				});

				//* Send the current list of bidders
				this.server.to(auctionId.toString()).emit('room-data', {
					room: auctionId,
					bidders: this.auctionRoomService.getBiddersInAuctionRoom(
						auctionId.toString(),
					),
				});
			});

			this.logger.debug(
				`${bidder.name} connected to the bidding ws 🤔 and joined auctions rooms ${auctionsToBeJoined.length} successfully`,
			);
		}
	}

	/**
	 * Fires when the client disconnected
	 */
	async handleDisconnect(client: Socket) {
		//* Remove the bidder from the list
		const removedBidder = this.auctionRoomService.removeBidder(client.id);

		//? Ensure that the bidder removed from the room
		if (removedBidder) {
			this.logger.warn('Bidder disconnected from the bidding ws 🤔');
		}
	}

	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('place-bid')
	async handlePaceBid(
		@ConnectedSocket() client: Socket,
		@MessageBody() { bidValue }: PlaceBidDto,
		@GetCurrentUserFromSocket() bidder: Buyer,
	) {
		const savedBidder = this.auctionRoomService.getBidder(client.id);
		if (!savedBidder) {
			throw new WsException('You are not in this auction room ❌');
		}

		//TODO: Check if valid bid

		//TODO: Save the bid
		const createdBid = await this.bidService.creatBid(
			savedBidder.room,
			bidder._id,
			bidValue,
		);

		//* Emit the bid to the client-side
		this.server.to(savedBidder.room).emit('new-bid', createdBid);

		//* Log bid to the console
		this.logger.log(
			"'" + bidder.email + "' placed bid of '" + bidValue + "' 💰",
		);
	}

	@UseGuards(SocketAuthGuard)
	@SubscribeMessage('leave-auction')
	async handleLeaveAuction(
		@ConnectedSocket() client: Socket,
		@MessageBody() { auctionId }: JoinOrLeaveAuctionDto,
		@GetCurrentUserFromSocket() bidder: Buyer,
	) {
		if (!auctionId || !this.auctionService.isValidAuction(auctionId)) {
			throw new WsException('You must provide valid auction id 😉');
		}

		this.logger.debug(
			"'" +
				bidder.email +
				"' want to leave auction with id '" +
				auctionId +
				"'",
		);

		//* Remove the bidder from the list
		const removedBidder = this.auctionRoomService.removeBidder(client.id);

		//? Ensure that the bidder removed from the room
		if (removedBidder) {
			this.logger.log(
				'Bidder left auction 👎🏻, with email: ' + removedBidder.email,
			);

			this.server.to(removedBidder.room).emit('message-to-client', {
				message: 'With sorry, a bidder left 😑',
				system: true, // To be used to identify the message as system message
			});

			//* Send the current list of bidders
			this.server.to(removedBidder.room).emit('room-data', {
				room: removedBidder.room,
				bidders: this.auctionRoomService.getBiddersInAuctionRoom(
					removedBidder.room,
				),
			});

			//* Leave the bidder from the room
			client.leave(auctionId);
		}
	}
}
