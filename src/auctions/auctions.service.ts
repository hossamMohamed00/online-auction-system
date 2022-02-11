import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction, AuctionDocument } from './entities/auction.schema';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectModel(Auction.name)
    private readonly auctionModel: Model<AuctionDocument>,
  ) {}

  /**
   * Create new auction
   * @param createAuctionDto
   * @param sellerId - Seller who created the auction
   */
  async create(createAuctionDto: CreateAuctionDto, sellerId: string) {
    const createdAuction: AuctionDocument = new this.auctionModel({
      ...createAuctionDto,
      seller: sellerId,
      endDat: null,
    });

    await createdAuction.save();

    return createAuctionDto;
  }

  /**
   * Find all auctions
   * @returns List of all existing auctions
   */
  findAll() {
    return this.auctionModel.find({}).populate('seller').exec();
  }

  /**
   * Find auction by id
   * @param _id - Auction id
   * @returns Auction instance if found, NotFoundException thrown otherwise.
   */
  async findById(_id: string) {
    const auction = await this.auctionModel.findById(_id);
    if (!auction) throw new NotFoundException('Auction not found ❌');

    return auction;
  }

  /**
   * Update auction details
   * @param _id - Auction id
   * @param updateAuctionDto - Dto for auction's properties to be updated
   * @returns updated auction instance
   */
  async update(_id: string, updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.auctionModel.findByIdAndUpdate(
      _id,
      updateAuctionDto,
      { new: true },
    );
    if (!auction) throw new NotFoundException('Auction not found ❌');

    return auction;
  }

  /**
   * Remove auction by id
   * @param _id - auction id
   * @returns Deleted auction instance
   */
  async remove(_id: string) {
    const auction = await this.auctionModel.findByIdAndRemove(_id);
    if (!auction) throw new NotFoundException('Auction not found ❌');

    return auction;
  }
}
