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
import { NewBid } from './types/new-bid.type';

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

				//* Handle the room data to be sent to the client
				this.handleRoomData(auctionId.toString());
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
	async handleIncomingBid(
		@ConnectedSocket() client: Socket,
		@MessageBody() { room, bidValue }: PlaceBidDto,
		@GetCurrentUserFromSocket() bidder: Buyer,
	) {
		//* Ensure that the bid value provided
		if (!bidValue || !room) {
			throw new WsException('Room and Bid value are required');
		}

		//* Get the bidder from the room
		const savedBidder = this.auctionRoomService.getBidder(client.id, room);
		if (!savedBidder) {
			throw new WsException('You are not in this auction room ❌');
		}

		//* Handle the bid and update auction details
		const createdBid: NewBid = await this.bidService.HandleBid(
			room,
			bidder._id,
			bidValue,
		);

		//* Emit the bid to the client-side
		this.server.to(room).emit('new-bid', createdBid);

		//* Handle the room data to be sent to the client
		this.handleRoomData(room);

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
		if (
			!auctionId ||
			!this.auctionService.isValidAuctionForBidding(auctionId)
		) {
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

			//* Handle the room data to be sent to the client
			this.handleRoomData(removedBidder.room);

			//* Leave the bidder from the room
			client.leave(auctionId);
		}
	}

	/*--------------------------*/
	/**
	 * Get auction details and emit the data to all room members
	 * @param auctionId - Auction id (room)
	 */
	private async handleRoomData(auctionId: string) {
		//* Get auction current bidders list
		const bidders = this.auctionRoomService.getBiddersInAuctionRoom(
			auctionId.toString(),
		);

		//* Get auction details (current bid, numOfBids etc)
		const auctionDetails =
			await this.auctionService.getCurrentAuctionDetailsForBidding(
				auctionId.toString(),
			);

		//* Emit room data to the client-side
		this.server.to(auctionId.toString()).emit('room-data', {
			room: auctionId,
			bidders,
			auctionDetails,
		});
	}
}
