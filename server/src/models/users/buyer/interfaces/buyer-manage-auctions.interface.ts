import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { Buyer, BuyerDocument } from '../schema/buyer.schema';

export interface BuyerAuctionsBehaviors {
	//* List all joined auctions
	listBidderJoinedAuctions(
		buyer: BuyerDocument,
	): Promise<{ joinedAuctions: Auction[] }>;

	//* Try to join auction
	joinAuction(buyer: Buyer, auctionId: MongoObjectIdDto);

	//* Retreat from auction
	retreatFromAuction(buyer: Buyer, auctionId: MongoObjectIdDto);

	//* Mark the auction as interesting to receive email when starting
	saveAuctionForLater(buyer: Buyer, auctionId: MongoObjectIdDto);
}
