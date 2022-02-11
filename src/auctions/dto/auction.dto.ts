import { Expose } from 'class-transformer';
import { UserDto } from 'src/users/dto';
import { ExposeId } from '../../common/decorators/expose-id.decorator';

/**
 * Auction dto - Describe what auction data to be sent over the network
 */
export class AuctionDto {
  @Expose()
  @ExposeId()
  _id: string;

  @Expose()
  product: string;

  @Expose()
  initialPrice: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: string;

  // @Expose()
  // seller: UserDto;
}
