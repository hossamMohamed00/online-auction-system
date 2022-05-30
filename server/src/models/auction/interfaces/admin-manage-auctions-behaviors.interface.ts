import { RejectAuctionDto } from '../dto';
import { Auction } from '../schema/auction.schema';
import { DashboardAuctionsCount } from '../types';

export interface AdminManageAuctionsBehaviors {
	//* Approve auction
	approveAuction(auctionId: string): Promise<Auction>;

	//* Reject auction and provide rejection reason
	rejectAuction(
		auctionId: string,
		rejectAuctionDto: RejectAuctionDto,
	): Promise<Auction>;

	//* Get all auctions count details for admin dashboard
	getAuctionsCount(): Promise<DashboardAuctionsCount>;

	//* Get the latest auction's winners for admin dashboard
	getWinnersBiddersForDashboard(): Promise<any[]>;

	//* Get the most top auctions based on num of bids on them
	getTopAuctionsForDashboard(top?: number): Promise<Auction[]>;
}
