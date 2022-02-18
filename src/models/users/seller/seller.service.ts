import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
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
