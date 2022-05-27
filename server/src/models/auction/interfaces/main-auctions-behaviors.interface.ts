import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { CreateAuctionDto } from '../dto';
import { Auction } from '../schema/auction.schema';

export interface MainAuctionsBehaviors {
	//* Create new auction
	create(createAuctionDto: CreateAuctionDto, seller: Seller): Promise<Auction>;
}
