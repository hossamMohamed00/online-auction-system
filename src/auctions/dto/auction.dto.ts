import { Expose, Transform } from 'class-transformer';
import { UserDto } from 'src/users/dto';
import { ExposeId } from '../../common/decorators/expose-id.decorator';
import { User } from 'src/users/entities/user.schema';
import { SerializeIt } from 'src/common/utils';

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

  @Expose()
  @Transform(({ obj }) => {
    return SerializeIt(UserDto, obj.seller);
  })
  seller: User;
}
