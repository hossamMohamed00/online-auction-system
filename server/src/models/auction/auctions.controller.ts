import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	GetCurrentUserData,
	IsPublicRoute,
	Roles,
} from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { Seller } from '../users/seller/schema/seller.schema';
import { Role } from '../users/shared-user/enums';
import { AuctionsService } from './auctions.service';
import { AuctionDto, CreateAuctionDto, UpdateAuctionDto } from './dto';

@ApiTags('Auction')
@Serialize(AuctionDto)
@Controller('auctions')
export class AuctionsController {
	constructor(private readonly auctionsService: AuctionsService) {}

	@Roles(Role.Seller)
	@Post()
	create(
		@Body() createAuctionDto: CreateAuctionDto,
		@GetCurrentUserData() seller: Seller,
	) {
		return this.auctionsService.create(createAuctionDto, seller);
	}

	@IsPublicRoute()
	@Get()
	findAll() {
		return this.auctionsService.findAll();
	}

	@IsPublicRoute()
	@Get(':id')
	findOne(@Param() { id }: MongoObjectIdDto) {
		return this.auctionsService.findById(id);
	}

	@Roles(Role.Admin)
	@Patch(':id')
	update(
		@Param() { id }: MongoObjectIdDto,
		@Body() updateAuctionDto: UpdateAuctionDto,
	) {
		return this.auctionsService.update(id, updateAuctionDto);
	}

	@Roles(Role.Admin)
	@Delete(':id')
	remove(@Param() { id }: MongoObjectIdDto) {
		return this.auctionsService.remove(id);
	}
}
