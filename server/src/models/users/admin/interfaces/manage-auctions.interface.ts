import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { FilterAuctionQueryDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';

export interface AuctionsBehavior {
	//* List all auctions for the admin
	listAllAuctions(
		filterAuctionQuery: FilterAuctionQueryDto,
	): Promise<Auction[]>;

	//* Approve specific auction
	approveAuction(id: MongoObjectIdDto): Promise<boolean>;
}
