import { Expose, Transform } from 'class-transformer';
import { ExposeObjectId } from '../../../common/decorators/mongo/expose-id.decorator';
import { SerializeIt } from 'src/common/utils';
import { UserDto } from 'src/models/users/shared-user/dto';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { Item } from 'src/models/items/schema/item.schema';
import { AuctionStatus } from '../enums';
import { ItemDto } from 'src/models/items/dto';

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
  initialPrice: number;

  @Expose()
  chairCost: number; // The cost of registering to bid.

  @Expose()
  numOfBids: number; // Current number of bids

  @Expose()
  highestBidValue: number; // Current highest bid value

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: AuctionStatus;

  @Expose()
  @Transform(({ obj }) => {
    //* Serialize  the seller object to remove the sensitive data
    return SerializeIt(UserDto, obj.seller);
  })
  seller: User;
}
