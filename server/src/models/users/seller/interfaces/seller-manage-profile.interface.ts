import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { Review } from 'src/models/review/schema/review.schema';
import { Seller } from '../schema/seller.schema';

export interface SellerProfileBehaviors {
	//* Get seller profile
	getProfile({ id }: MongoObjectIdDto): Promise<{
		seller: Seller;
		auctions: Auction[];
		reviews: Review[];
	}>;
}
