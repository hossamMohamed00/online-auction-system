import { Auction } from 'src/models/auction/schema/auction.schema';
import { Buyer } from '../schema/buyer.schema';

export interface BuyerProfileBehaviors {
	//* Get buyer profile
	getProfile(buyerId: string): Promise<Buyer>;
}
