import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublicRoute } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateAuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { BuyerService } from './buyer.service';
import { BuyerAuctionsBehaviors } from './interfaces';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController implements BuyerAuctionsBehaviors {
	constructor(private readonly buyerService: BuyerService) {}

	/* Handle Auctions Functions */
	@Post('auction/:id')
	joinAuction(@Param() { id }: MongoObjectIdDto): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	@Post('auction/:id')
	retreatFromAuction(@Param() { id }: MongoObjectIdDto): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	@Post('auction/:id')
	saveAuctionForLater(@Param() { id }: MongoObjectIdDto): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
