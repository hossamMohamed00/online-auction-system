import { Auction } from 'src/models/auction/schema/auction.schema';
import { Seller } from '../schema/seller.schema';

export interface SellerProfileBehaviors {
	//* Get seller profile
	profile(sellerId: string): Promise<{ seller: Seller; auctions: Auction[] }>;
}
