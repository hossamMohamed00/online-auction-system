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
import {
	GetCurrentUserData,
	IsPublicRoute,
	Roles,
} from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import {
	AuctionDto,
	CreateAuctionDto,
	UpdateAuctionDto,
} from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { Review } from 'src/models/review/schema/review.schema';
import { Role } from '../shared-user/enums';
import { SellerProfileDto } from './dto';
import {
	SellerAuctionsBehaviors,
	SellerProfileBehaviors,
	SellerReviewsBehaviors,
} from './interfaces';
import { Seller, SellerDocument } from './schema/seller.schema';
import { SellerService } from './seller.service';

@ApiTags('Seller')
@Controller('seller')
export class SellerController
	implements
		SellerAuctionsBehaviors,
		SellerProfileBehaviors,
		SellerReviewsBehaviors
{
	constructor(private readonly sellerService: SellerService) {}

	/* Handle Profile Functions */

	@IsPublicRoute()
	@Serialize(SellerProfileDto)
	@Get('profile/:id')
	getProfile(
		@Param() { id }: MongoObjectIdDto,
	): Promise<{ seller: Seller; auctions: Auction[]; reviews: Review[] }> {
		return this.sellerService.getProfile(id);
	}

	/* Handle Auctions Functions */

	@Roles(Role.Seller)
	@Serialize(AuctionDto)
	@FormDataRequest() // Comes from NestjsFormDataModule (Used to upload files)
	@Post('auction')
	addAuction(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetCurrentUserData() seller: SellerDocument,
	): Promise<Auction> {
		return this.sellerService.addAuction(createAuctionDto, seller);
	}

	@Roles(Role.Seller)
	@Serialize(AuctionDto)
	@Get('auction')
	listAuctions(
		@GetCurrentUserData() seller: SellerDocument, // Get the current logged in seller
	): Promise<Auction[]> {
		return this.sellerService.listAuctions(seller);
	}

	@Roles(Role.Seller)
	@Serialize(AuctionDto)
	@Patch('auction/:id')
	editAuction(
		@Param() { id }: MongoObjectIdDto, // auction id
		@Body() updateAuctionDto: UpdateAuctionDto,
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Auction> {
		return this.sellerService.editAuction(id, sellerId, updateAuctionDto);
	}

	@Roles(Role.Seller)
	@Serialize(AuctionDto)
	@Delete('auction/:id')
	removeAuction(
		@Param() { id }: MongoObjectIdDto, // auction id
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Auction> {
		return this.sellerService.removeAuction(id, sellerId);
	}

	/* Handle Reviews Functions */

	@Roles(Role.Seller)
	@Serialize(ReviewDto)
	@Get('review')
	listSellerReviews(
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<Review[]> {
		return this.sellerService.listSellerReviews(sellerId);
	}
}
