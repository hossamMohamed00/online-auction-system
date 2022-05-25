import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplaintService } from 'src/models/complaint/complaint.service';
import { CreateComplaintDto } from 'src/models/complaint/dto';
import { UserDocument } from '../shared-user/schema/user.schema';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly complaintService: ComplaintService,
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
	createComplaint(body: CreateComplaintDto, User: UserDocument) {
		return this.complaintService.create(body, User);
	}
}
