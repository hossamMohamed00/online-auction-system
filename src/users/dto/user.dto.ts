import { Expose } from 'class-transformer';

/**
 * User dto - Describe what user data to be sent over the network
 */
export class UserDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
