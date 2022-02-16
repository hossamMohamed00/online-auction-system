import { IsMongoId } from 'class-validator';

/*
 * This is to ensure that the id is a valid mongo id.
 */
export class IsAuctionId {
  @IsMongoId({ message: 'Invalid user id ❌' })
  id: string;
}
