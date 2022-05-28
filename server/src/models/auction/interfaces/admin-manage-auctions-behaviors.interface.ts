import { RejectAuctionDto } from '../dto';
import { Auction } from '../schema/auction.schema';

export interface AdminManageAuctionsBehaviors {
	//* Approve auction
	approveAuction(auctionId: string): Promise<Auction>;

	//* Reject auction and provide rejection reason
	rejectAuction(
		auctionId: string,
		rejectAuctionDto: RejectAuctionDto,
	): Promise<Auction>;
}
