import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';
import { User } from '../users/shared-user/schema/user.schema';
import { BidDocument, Bid } from './schema/bid.schema';

@Injectable()
export class BidService {
	constructor(
		@InjectModel(Bid.name)
		private readonly chatModel: Model<BidDocument>,
		private readonly authService: AuthService,
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
	 * Create new chat between 2 users
	 * @param auctionId
	 * @param userId
	 * @param bidValue
	 */
	async creatBid(
		auctionId: string,
		userId: ObjectId,
		bidValue: number,
	): Promise<BidDocument> {
		//* Create new chat
		const createdChat: BidDocument = new this.chatModel({
			user: userId,
			auction: auctionId,
			amount: bidValue,
		});

		if (!createdChat) {
			throw new Error('Failed to create chat');
		}
		// Save the created chat
		await createdChat.save();

		return createdChat;
	}
}
