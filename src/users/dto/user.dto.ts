import { Expose } from 'class-transformer';
import { ExposeId } from '../../common/decorators/expose-id.decorator';

/**
 * User dto - Describe what user data to be sent over the network
 */
export class UserDto {
  @Expose()
  @ExposeId()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
