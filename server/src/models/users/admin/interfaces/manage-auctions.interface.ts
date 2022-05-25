import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import {
	FilterAuctionQueryDto,
	RejectAuctionDto,
} from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { AdminFilterAuctionQueryDto } from '../dto';

export interface AuctionsBehavior {
	//* List all auctions for the admin
	listAllAuctions(
		filterAuctionQuery: AdminFilterAuctionQueryDto,
	): Promise<Auction[]>;

	//* Approve specific auction
	approveAuction(id: MongoObjectIdDto): Promise<Auction>;

	//* Reject specific auction
	rejectAuction(
		id: MongoObjectIdDto,
		rejectAuctionDto: RejectAuctionDto,
	): Promise<Auction>;
}
