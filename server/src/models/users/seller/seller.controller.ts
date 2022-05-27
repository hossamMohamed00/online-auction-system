import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Delete,
	Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import {
	AuctionDto,
	CreateAuctionDto,
	UpdateAuctionDto,
} from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { ComplaintDto, CreateComplaintDto } from 'src/models/complaint/dto';
import { User, UserDocument } from '../shared-user/schema/user.schema';
import { SellerComplaintBehavior } from './interfaces/seller-manage-complaint.interface';
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Role } from '../shared-user/enums';
import { SellerDto, SellerProfileDto } from './dto';
import {
	SellerAuctionsBehaviors,
	SellerProfileBehaviors,
	SellerReviewsBehaviors,
} from './interfaces';
import { Seller, SellerDocument } from './schema/seller.schema';
import { SellerService } from './seller.service';

@ApiTags('Seller')
@Roles(Role.Seller)
@Controller('seller')
export class SellerController
	implements
	SellerAuctionsBehaviors,
	SellerProfileBehaviors,
	SellerReviewsBehaviors,
	SellerComplaintBehavior {
	constructor(private readonly sellerService: SellerService) { }

	/* Handle Profile Functions */

	@Serialize(SellerProfileDto)
	@Get('profile')
	getProfile(
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<{ seller: Seller; auctions: Auction[]; reviews: Review[] }> {
		return this.sellerService.getProfile(sellerId);
	}

	/* Handle Auctions Functions */

	@Serialize(AuctionDto)
	@FormDataRequest() // Comes from NestjsFormDataModule (Used to upload files)
	@Post('auction')
	addAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetCurrentUserData() seller: SellerDocument,
	): Promise<Auction> {
		return this.sellerService.addAuction(createAuctionDto, seller);
	}

	@Serialize(AuctionDto)
	@Get('auction')
	listAuctions(
		@GetCurrentUserData() seller: SellerDocument, // Get the current logged in seller
	): Promise<Auction[]> {
		return this.sellerService.listAuctions(seller);
	}

	@Serialize(AuctionDto)
	@Patch('auction/:id')
	editAuction(
		@Param() { id }: MongoObjectIdDto, // auction id
		@Body() updateAuctionDto: UpdateAuctionDto,
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Auction> {
		return this.sellerService.editAuction(id, sellerId, updateAuctionDto);
	}

	@Serialize(AuctionDto)
	@Delete('auction/:id')
	removeAuction(
		@Param() { id }: MongoObjectIdDto, // auction id
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Auction> {
		return this.sellerService.removeAuction(id, sellerId);
	}

	/* Handle Complaints Functions */

	// @Serialize(ComplaintDto)
	@Post('complaint')
	createCompliant(
		@Body() body: CreateComplaintDto,
		@GetCurrentUserData() user: UserDocument,
	) {
		return this.sellerService.createComplaint(body, user);
	}

	// @Serialize(ComplaintDto)
	@Get('complaint')
	listMyComplaint(@GetCurrentUserData('_id') user: string) {
		return this.sellerService.listMyComplaint(user);
	}

	// @Serialize(ComplaintDto)
	@Delete('complaint/:id')
	deleteComplaint(@Param() { id }: MongoObjectIdDto) {
		return this.sellerService.deleteComplaint(id);
		/* Handle Reviews Functions */
		@Serialize(ReviewDto)
		@Get('review')
		listSellerReviews(
		@GetCurrentUserData('_id') sellerId: string,
	): Promise < Review[] > {
			return this.sellerService.listSellerReviews(sellerId);
		}
	}

	/* Handle Reviews Functions */

	@Serialize(ReviewDto)
	@Get('review')
	listSellerReviews(
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Review[]> {
		return this.sellerService.listSellerReviews(sellerId);
	}
}
