import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';
import { SellerDocument } from '../schema/seller.schema';

export interface AuctionsBehaviors {
  addAuction();
  listAuctions(seller: SellerDocument): Promise<AuctionDocument[]>;
  editAuction();
  removeAuction(
    id: MongoObjectIdDto,
    sellerId: string,
  ): Promise<AuctionDocument>;
}
