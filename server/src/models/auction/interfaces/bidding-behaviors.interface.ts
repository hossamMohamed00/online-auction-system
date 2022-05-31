import { Bid } from 'src/models/bids/schema/bid.schema';

export interface BiddingBehaviors {
	//* Check if there is an ongoing auction with that id
	isValidAuctionForBidding(auctionId: string): Promise<boolean>;

	//* Check if given bidder already joined specific auction
	isAlreadyJoined(auctionId: string, bidderId: string): Promise<boolean>;

	//* Check if given bidder has auction minimum assurance to join auction
	hasMinAssurance(auctionId: string, bidderId: string): Promise<boolean>;

	//* Append given bidder to specific auction bidders list
	appendBidder(auctionId: string, bidderId: string): Promise<boolean>;

	//* Check if the bidder already exists in auction's waiting list
	isAlreadyInWaitingList(auctionId: string, bidderId: string): Promise<boolean>;

	//* Add the bidder to auction's waiting list
	addBidderToWaitingList(auctionId: string, bidderId: string): Promise<boolean>;

	//* Check that incoming bid is valid for specific auction
	isValidBid(auctionId: string, bidValue: number): Promise<boolean>;

	//* Accept new bid in given auction and update all related auctions details
	handleNewBid(auctionId: string, bid: Bid): Promise<boolean>;

	//* Return specific details about auctions to be emitted to client
	getCurrentAuctionDetailsForBidding(auctionId: string): Promise<any>;

	//* Get the winner of the auction
	getAuctionWinner(auctionId: string);
}
