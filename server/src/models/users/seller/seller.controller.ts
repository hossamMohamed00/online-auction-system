import {
	Body,
	Controller,
	Get,
	Patch,
	Post,
	Delete,
	Param,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { Role } from '../shared-user/enums';
import { User, UserDocument } from '../shared-user/schema/user.schema';
import { AuctionsBehaviors } from './interfaces';
import { SellerDocument } from './schema/seller.schema';
import { SellerService } from './seller.service';

@ApiTags('Seller')
@Roles(Role.Seller)
@Controller('seller')
export class SellerController implements AuctionsBehaviors {
	constructor(private readonly sellerService: SellerService) {}

	/* Handle Auctions Functions */

	@Serialize(AuctionDto)
	@FormDataRequest() // Comes from NestjsFormDataModule
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

	@Serialize(ComplaintDto)
	@Post('complaint')
	CreateCompliant(
		@Body() body: CreateComplaintDto,
		@GetCurrentUserData() user: UserDocument,
	) {
		return this.sellerService.createComplaint(body, user);
	}
}
