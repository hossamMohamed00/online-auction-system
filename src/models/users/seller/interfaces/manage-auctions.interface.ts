import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateAuctionDto, UpdateAuctionDto } from 'src/models/auction/dto';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';
import { SellerDocument } from '../schema/seller.schema';

export interface AuctionsBehaviors {
  addAuction(createAuctionDto: CreateAuctionDto, seller: SellerDocument);
  listAuctions(seller: SellerDocument): Promise<AuctionDocument[]>;
  editAuction(updateAuctionDto: UpdateAuctionDto, seller: SellerDocument);
  removeAuction(
    id: MongoObjectIdDto,
    sellerId: string,
  ): Promise<AuctionDocument>;
}
