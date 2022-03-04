import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
	) {}

	async create(body: any) {
		const buyer = new this.buyerModel(body);
		await buyer.save();

		return buyer;
	}
	async findAll() {
		const buyers = await this.buyerModel.find().exec();
		return buyers;
	}
}
