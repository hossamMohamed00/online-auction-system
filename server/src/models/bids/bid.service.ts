import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model, ObjectId } from 'mongoose';
import { Socket } from 'socket.io';
import { AuctionsService } from '../auction/auctions.service';

import { AuthService } from '../auth/auth.service';
import { User } from '../users/shared-user/schema/user.schema';
import { BidDocument, Bid } from './schema/bid.schema';
import { NewBid } from './types/new-bid.type';

@Injectable()
export class BidService {
	private readonly logger: Logger = new Logger(BidService.name);

	constructor(
		@InjectModel(Bid.name)
		private readonly bidModel: Model<BidDocument>,
		private readonly authService: AuthService,
		private readonly auctionService: AuctionsService,
	) {}

	/**
	 * Accept the socket client and return the user
	 * @param client
	 * @return user if found
	 */
	async getConnectedClientUserObject(client: Socket): Promise<User | null> {
		//* Get the access token from client
		const accessToken = await this.authService.getJWTTokenFromSocketClient(
			client,
		);

		//? If no access token found
		if (!accessToken) {
			return null;
		}

		//* Get the user
		const user = await this.authService.getUserFromJWT(accessToken); //* The user may be null (expired token)

		return user;
	}

	/**
	 * Handle new incoming bid
	 * @param auctionId
	 * @param userId
	 * @param bidValue
	 */
	async HandleBid(
		auctionId: string,
		userId: ObjectId,
		bidValue: number,
	): Promise<NewBid> {
		this.logger.debug(
			'New bid accepted ⚡⚡ with value ' + bidValue + ' from ' + userId,
		);

		//* Before create the bid, check if it is valid
		const isValidBid = await this.auctionService.isValidBid(
			auctionId,
			bidValue,
		);

		if (!isValidBid) {
			this.logger.error('Bid rejected (Invalid value) 🤷‍♂️');
			throw new WsException(
				'Bid value must be greater than current highest bid 👀',
			);
		}

		//* Create new bid
		const createdBid: BidDocument = new this.bidModel({
			user: userId,
			auction: auctionId,
			amount: bidValue,
		});

		if (!createdBid) {
			this.logger.error('Bid not created 🤷‍♂️');
			throw new WsException('Failed accept this bid 😔');
		}

		//* Save the created bid
		await createdBid.save();

		//* Handle the new bid for the auction
		const result = await this.auctionService.handleNewBid(
			auctionId,
			createdBid,
		);

		if (!result) {
			this.logger.error('Bid not saved 🤷‍♂️');
			throw new WsException('Failed to handle new bid');
		}

		//* Return specific data to the client
		return {
			amount: createdBid.amount,
			auction: createdBid.auction._id.toString(),
			user: {
				name: createdBid.user.name,
				email: createdBid.user.email,
			},
			createdAt: createdBid.createdAt,
		};
	}
}
