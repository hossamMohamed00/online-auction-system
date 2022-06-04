import {
	Injectable,
	Logger,
	BadRequestException,
	Inject,
	forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { CreateAuctionDto, UpdateAuctionDto } from 'src/models/auction/dto';
import {
	Auction,
	AuctionDocument,
} from 'src/models/auction/schema/auction.schema';
import { ComplaintService } from 'src/models/complaint/complaint.service';
import { Review } from 'src/models/review/schema/review.schema';
import { Seller, SellerDocument } from './schema/seller.schema';
import { ReviewService } from 'src/models/review/review.service';
import { CloudinaryService } from 'src/providers/files-upload/cloudinary.service';
import { UserUpdateDto } from '../shared-user/dto/update-user.dto';
import { ImageType, ResponseResult } from 'src/common/types';

@Injectable()
export class SellerService {
	//? Create logger
	private logger: Logger = new Logger('SellerService');

	constructor(
		@InjectModel(Seller.name)
		private readonly sellerModel: Model<SellerDocument>,
		@Inject(forwardRef(() => AuctionsService)) // To avoid Circular dependency between the two services
		private readonly auctionsService: AuctionsService,
		@Inject(forwardRef(() => ReviewService))
		private readonly reviewService: ReviewService,
		private cloudinary: CloudinaryService,
	) {}

	/* Handle Profile Functions logic*/
	async getProfile(
		sellerId: string,
	): Promise<{ seller: Seller; auctions: Auction[]; reviews: Review[] }> {
		//* Find seller
		const seller = await this.sellerModel.findById(sellerId);
		if (!seller) {
			throw new BadRequestException('No Seller With That Id ❌');
		}

		//* Get seller auctions
		const auctions: Auction[] = await this.listAuctions(seller);

		//* Get seller reviews
		const reviews: Review[] = await this.listSellerReviews(sellerId);

		return { seller, auctions, reviews };
	}

	/**
	 * Edit seller profile data
	 * @param sellerId
	 * @param updateSellerDto
	 * @returns updated seller instance
	 */
	async editProfile(
		sellerId: string,
		updateSellerDto: UserUpdateDto,
	): Promise<ResponseResult> {
		//* Check if seller upload new image to upload it to cloudinary
		let image: ImageType;
		let imageUpdated = false;
		if (updateSellerDto.image) {
			imageUpdated = true;
			this.logger.debug('Uploading image to cloudinary...');

			try {
				// Upload image to cloudinary
				const savedImage = await this.cloudinary.uploadImage(
					updateSellerDto.image,
				);

				//* If upload success, save image url and public id to db
				if (savedImage.url) {
					this.logger.log('User Image uploaded successfully!');

					image = new ImageType(savedImage.url, savedImage.public_id);
				}
			} catch (error) {
				this.logger.error('Cannot upload user image to cloudinary ❌');
				throw new BadRequestException('Cannot upload image to cloudinary ❌');
			}

			//* Override image field to the uploaded image
			updateSellerDto.image = image;
		}

		//* Find the seller and update his data
		const seller = await this.sellerModel.findByIdAndUpdate(sellerId, {
			...updateSellerDto,
		});

		//? Remove old image if there was one
		if (imageUpdated && seller.image) {
			//* Remove the image by public id
			await this.cloudinary.destroyImage(seller.image.publicId);
		}

		return {
			success: true,
			message: 'Seller data updated successfully ✔✔',
		};
	}

	/* Handle Auctions Functions logic*/

	/**
	 * Add new auction to the given seller
	 * @param createAuctionDto - Auction data
	 * @param seller
	 */
	async addAuction(
		createAuctionDto: CreateAuctionDto,
		seller: SellerDocument,
	): Promise<Auction> {
		return this.auctionsService.create(createAuctionDto, seller);
	}

	/**
	 * List seller's auctions
	 */
	async listAuctions(seller: SellerDocument) {
		/*
		 * Populate 'auctions' property to the seller
		 * Also populate item and category documents
		 */
		this.logger.log(
			'Populating auctions on seller and nested item and category...',
		);
		await seller.populate({
			path: 'auctions',
			populate: [
				{
					path: 'item',
				},
				{
					path: 'category',
				},
				{
					path: 'winningBuyer',
				},
			],
		});

		// FIXME: Fix this error
		// @ts-ignore: Unreachable code error
		const auctions: AuctionDocument[] = seller.auctions;

		return auctions;
	}

	/**
	 * Update specific auction for the seller
	 * @param auctionId - Auction id
	 * @param sellerId - Logged in seller id
	 * @param updateAuctionDto - New auction data
	 * @returns Updated auction instance
	 */
	async editAuction(
		auctionId: string,
		sellerId: string,
		updateAuctionDto: UpdateAuctionDto,
	): Promise<Auction> {
		return this.auctionsService.update(auctionId, sellerId, updateAuctionDto);
	}

	/**
	 * Remove auction by id of specific seller
	 * @param auctionId
	 * @param sellerId
	 * @returns deleted auction document
	 */
	async removeAuction(auctionId: string, sellerId: string): Promise<Auction> {
		return this.auctionsService.remove(auctionId, sellerId);
	}

	/* Handle Reviews Functions logic */

	/**
	 * List all seller reviews
	 * @param sellerId
	 * @returns Array of reviews for that seller
	 */
	async listSellerReviews(sellerId: string) {
		return this.reviewService.getSellerReviews(sellerId);
	}

	/**
	 * Accept seller rate and update the rating in db
	 * @param sellerId - Seller id
	 * @param rate - new calculated rating
	 * @returns void
	 */
	async updateSellerRating(sellerId: string | Seller, rate: number) {
		const seller = await this.sellerModel.findByIdAndUpdate(
			sellerId,
			{
				rating: rate,
			},
			{ new: true },
		);

		if (!seller) {
			this.logger.error(`Cannot update ${seller.name} rate.`);
			return;
		}

		this.logger.log(
			`Seller ${seller.name} rating successfully update and become ${seller.rating}`,
		);
	}
}
