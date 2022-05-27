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
import { ReviewDto } from 'src/models/review/dto/review.dto';
import { Role } from '../shared-user/enums';
import { SellerDto, SellerProfileDto } from './dto';
import { SellerAuctionsBehaviors, SellerProfileBehaviors } from './interfaces';
import { Seller, SellerDocument } from './schema/seller.schema';
import { SellerService } from './seller.service';

@ApiTags('Seller')
@Roles(Role.Seller)
@Controller('seller')
export class SellerController
	implements SellerAuctionsBehaviors, SellerProfileBehaviors
{
	constructor(private readonly sellerService: SellerService) {}

	/* Handle Profile Functions */
	@Serialize(SellerProfileDto)
	@Get('profile')
	profile(
		@GetCurrentUserData('_id') sellerId: string,
	): Promise<{ seller: Seller; auctions: Auction[] }> {
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

	/** */
	@Get('review')
	@Serialize(ReviewDto)
	listSellerReviews(@GetCurrentUserData('_id') sellerId: string) {
		return this.sellerService.getMyReviews(sellerId);
	}
}
