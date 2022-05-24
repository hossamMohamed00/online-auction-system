import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { Buyer } from '../schema/buyer.schema';

export interface BuyerAuctionsBehaviors {
	//* Try to join auction
	joinAuction(buyer: Buyer, auctionId: MongoObjectIdDto);

	//* List all buyer auctions
	listMyAuctions(buyer: string): Promise<Auction[]>;

	//* Retreat from auction
	retreatFromAuction(buyer: Buyer, auctionId: MongoObjectIdDto);

	//* Mark the auction as interesting to receive email when starting
	saveAuctionForLater(buyer: Buyer, auctionId: MongoObjectIdDto);
}
