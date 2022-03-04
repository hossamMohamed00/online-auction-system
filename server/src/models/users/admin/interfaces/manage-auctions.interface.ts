import { FilterAuctionQueryDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';

export interface AuctionsBehavior {
	listAllAuctions(
		filterAuctionQuery: FilterAuctionQueryDto,
	): Promise<Auction[]>;
	// listPendingAuctions(): Promise<Auction[]>;
	// listClosedAuctions(): Promise<Auction[]>;
}
