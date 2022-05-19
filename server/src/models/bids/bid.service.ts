import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BidDocument, Bid } from './schema/bid.schema';

@Injectable()
export class BidService {
	constructor(
		@InjectModel(Bid.name)
		private readonly chatModel: Model<BidDocument>,
	) {}

	/**
	 * Create new chat between 2 users
	 * @param clientEmail
	 * @param receiverEmail
	 * @param message
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
