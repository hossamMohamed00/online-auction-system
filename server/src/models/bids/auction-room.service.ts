import { Injectable } from '@nestjs/common';
import { AuctionRoomMember } from './types/auction-room-member.type';

@Injectable()
export class AuctionRoomService {
	private onlineBidders: any = new Array();

	/**
	 * Add new bidder to the list
	 * @param AuctionRoomMember - bidder data
	 * @returns bidder if added || null
	 */
	addBidder({ socketId, email, room }: AuctionRoomMember) {
		// Validate data
		if (!socketId || !email || !room) {
			return null;
		}

		// Clean data
		email = email.trim().toLowerCase();
		room = room.trim().toLowerCase();

		//? Check if already exists in the room
		const existingBidder = this.onlineBidders.find(
			(bidder: AuctionRoomMember) =>
				bidder.room === room && bidder.email === email,
		);

		if (existingBidder) {
			return null;
		}

		//* Add the bidder
		const bidder = { socketId, email, room };

		this.onlineBidders.push(bidder);

		return bidder;
	}

	/**
	 * Remove bidder from the list
	 * @param socketId
	 * @returns removed bidder if removed || null
	 */
	removeBidder(socketId: string) {
		const index = this.onlineBidders.findIndex(
			member => member.socketId === socketId,
		);

		if (index !== -1) {
			return this.onlineBidders.splice(index, 1)[0];
		} else {
			return null;
		}
	}

	/**
	 * Get bidder from any filter
	 * @param filter Member email
	 * @returns bidder
	 */
	getBidderRoom(socketId: string) {
		const member = this.onlineBidders.find(
			member => member.socketId === socketId,
		);
		return member;
	}

	/**
	 * Return list of all available bidders in specific room
	 * @param room - room name
	 */
	getBiddersInAuctionRoom(room: string) {
		room = room.trim().toLowerCase();
		return this.onlineBidders.filter(bidder => bidder.room === room);
	}
}
