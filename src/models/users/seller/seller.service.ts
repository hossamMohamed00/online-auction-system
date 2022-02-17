import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller, SellerDocument } from './schema/seller.schema';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private readonly sellerModel: Model<SellerDocument>,
  ) {}

  async create(body: any) {
    const seller = new this.sellerModel(body);
    await seller.save();

    return seller;
  }
  async findAll() {
    const sellers = await this.sellerModel.find().exec();
    return sellers;
  }
}
