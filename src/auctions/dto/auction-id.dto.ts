import { IsMongoId } from 'class-validator';

export class AuctionId {
  @IsMongoId({ message: 'Invalid user id' })
  id: string;
}
