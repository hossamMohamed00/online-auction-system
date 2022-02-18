import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';

export interface AuctionsBehaviors {
  addAuction();
  listAuctions();
  editAuction();
  removeAuction(
    id: MongoObjectIdDto,
    sellerId: string,
  ): Promise<AuctionDocument>;
}
