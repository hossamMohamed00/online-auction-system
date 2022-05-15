import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateAuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';

export interface BuyerAuctionsBehaviors {
	//* Try to join auction
	joinAuction(auctionId: MongoObjectIdDto): Promise<boolean>;

	//* Retreat from auction
	retreatFromAuction(auctionId: MongoObjectIdDto): Promise<boolean>;

	//* Mark the auction as interesting to receive email when starting
	saveAuctionForLater(auctionId: MongoObjectIdDto): Promise<boolean>;
}
