import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from 'src/models/review/dto/create-review.dto';
import { UpdateReviewDto } from 'src/models/review/dto/update-review.dto';
import { ReviewService } from 'src/models/review/review.service';
import { Review, ReviewDocument } from 'src/models/review/schema/review.schema';
import { SellerDocument } from '../seller/schema/seller.schema';
import { Buyer, BuyerDocument } from './schema/buyer.schema';

@Injectable()
export class BuyerService {
	constructor(
		@InjectModel(Buyer.name)
		private readonly buyerModel: Model<BuyerDocument>,
		private readonly ReviewService: ReviewService,
	) {}
	private logger: Logger = new Logger('BuyerService 👋🏻');

	async create(body: any) {
		const buyer = new this.buyerModel(body);
		await buyer.save();

		return buyer;
	}
	async findAll() {
		const buyers = await this.buyerModel.find().exec();
		return buyers;
	}
	async MakeReviw(
		createReviewdto: CreateReviewDto,
		buyer: BuyerDocument,
		seller: SellerDocument,
	): Promise<Review> {
		this.logger.log('Maked New Review in' + seller + 'from ' + buyer.id);
		return this.ReviewService.create(createReviewdto, buyer.id, seller);
	}
	async Edit(id: string, UpdateReviewDto: UpdateReviewDto): Promise<Review> {
		return this.ReviewService.Edit(UpdateReviewDto, id);
	}
	async MyReviewInOne(
		buyer: BuyerDocument,
		seller: SellerDocument,
	): Promise<Review> {
		return this.ReviewService.ReviewInSeller(seller, buyer);
	}
}
