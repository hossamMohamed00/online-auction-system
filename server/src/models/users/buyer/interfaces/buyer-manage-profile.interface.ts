import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { Buyer } from '../schema/buyer.schema';

export interface BuyerProfileBehaviors {
	//* Get buyer profile
	getProfile({ id: buyerId }: MongoObjectIdDto): Promise<Buyer>;
}
