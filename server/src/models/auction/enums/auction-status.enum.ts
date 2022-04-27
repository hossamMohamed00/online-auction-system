export enum AuctionStatus {
	Pending = 'pending',
	Accepted = 'accepted',
	Denied = 'denied',
	Closed = 'closed',
}

// This enum used by users to filter the auctions (look at filter-auctions.dto.ts)
export enum AuctionStatusForSearch {
	Pending = 'pending',
	Accepted = 'accepted',
	Closed = 'closed',
	// normal users not allowed to see denied auctions
}
