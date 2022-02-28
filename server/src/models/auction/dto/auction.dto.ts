import { Expose, Transform } from 'class-transformer';
import { ExposeObjectId } from '../../../common/decorators/mongo/expose-id.decorator';
import { SerializeIt } from 'src/common/utils';
import { UserDto } from 'src/models/users/shared-user/dto';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Item } from 'src/models/items/schema/item.schema';
import { AuctionStatus } from '../enums';
import { ItemDto } from 'src/models/items/dto';
import { Category } from 'src/models/category/schema/category.schema';
import { CategoryDto } from 'src/models/category/dto';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { SellerDto } from 'src/models/users/seller/dto';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { BuyerDto } from 'src/models/users/buyer/dto';

/**
 * Auction dto - Describe what auction data to be sent over the network
 */
export class AuctionDto {
	@Expose()
	@ExposeObjectId()
	_id: string;

	@Expose()
	title: string;

	@Expose()
	@Transform(({ obj }) => {
		//* Serialize  the item object to remove the sensitive data
		return SerializeIt(ItemDto, obj.item);
	})
	item: Item;

	@Expose()
	basePrice: number;

	@Expose()
	startDate: Date;

	@Expose()
	endDate: Date;

	@Expose()
	chairCost: number;

	@Expose()
	minimumBidAllowed: number;

	@Expose()
	currentBid: number;

	@Expose()
	bidIncrement: number;

	@Expose()
	numOfBids: number;

	@Expose()
	status: AuctionStatus;

	@Expose()
	@Transform(({ obj }) => {
		//* Serialize  the buyer object to remove the sensitive data
		return SerializeIt(BuyerDto, obj.winningBuyer);
	})
	winningBuyer: Buyer;

	@Expose()
	@Transform(({ obj }) => {
		//* Serialize  the seller object to remove the sensitive data
		return SerializeIt(SellerDto, obj.seller);
	})
	seller: Seller;

	@Expose()
	@Transform(({ obj }) => {
		//* Serialize the category object.
		return SerializeIt(CategoryDto, obj.category);
	})
	category: Category;
}
