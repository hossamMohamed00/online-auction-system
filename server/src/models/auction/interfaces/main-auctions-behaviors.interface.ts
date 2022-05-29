import { Seller } from 'src/models/users/seller/schema/seller.schema';
import {
	CreateAuctionDto,
	FilterAuctionQueryDto,
	UpdateAuctionDto,
} from '../dto';
import { Auction } from '../schema/auction.schema';

export interface MainAuctionsBehaviors {
	//* Create new auction
	create(createAuctionDto: CreateAuctionDto, seller: Seller): Promise<Auction>;

	//* Find all auctions with filter
	findAll(filterAuctionQuery?: FilterAuctionQueryDto): Promise<Auction[]>;

	//* Get single auction
	findById(_id: string): Promise<Auction>;

	//* Update auction
	update(
		auctionId: string,
		sellerId: string,
		{ item: itemNewData, ...updateAuctionDto }: UpdateAuctionDto,
	): Promise<Auction>;

	//* Remove auction by id and seller id
	remove(auctionId: string, sellerId: string): Promise<Auction>;

	//* Check if there are running(ongoing/upcoming) auctions in one category
	isThereAnyRunningAuctionRelatedToCategory(
		categoryId: string,
	): Promise<boolean>;

	//* Remove all category in one category
	removeAllCategoryAuctions(categoryId: string): Promise<{ success: boolean }>;

	//* Check if auction exists or not
	isExists(auctionId: string, sellerId: string): Promise<boolean>;
}
