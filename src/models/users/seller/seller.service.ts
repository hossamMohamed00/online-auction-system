import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';
import { Seller, SellerDocument } from './schema/seller.schema';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
    private readonly auctionsService: AuctionsService,
  ) {}

  /* Handle Auctions Functions logic*/

  /**
   * List seller's auctions
   */
  async listAuctions(seller: SellerDocument): Promise<AuctionDocument[]> {
    await seller.populate({
      path: 'auctions',
    });

    // @ts-ignore: Unreachable code error
    const auctions = seller.auctions;

    return auctions;
  }

  /**
   * Remove auction by id of specific seller
   * @param auctionId
   * @param sellerId
   * @returns deleted auction document
   */
  async removeAuction(auctionId: string, sellerId: string) {
    // TODO - Ensure that the seller owns this auction

    return this.auctionsService.remove(auctionId);
  }
}
