import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
	GetCurrentUserData,
	IsPublicRoute,
	Roles,
} from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateAuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { Role } from '../shared-user/enums';
import { User } from '../shared-user/schema/user.schema';
import { BuyerService } from './buyer.service';
import { BuyerAuctionsBehaviors } from './interfaces';
import { Buyer } from './schema/buyer.schema';

@ApiTags('Buyer')
@Roles(Role.Buyer)
@Controller('buyer')
export class BuyerController implements BuyerAuctionsBehaviors {
	constructor(private readonly buyerService: BuyerService) {}

	/* Handle Auctions Functions */
	@Post('auction/:id')
	@HttpCode(HttpStatus.OK)
	joinAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	) {
		return this.buyerService.joinAuction(buyer, id);
	}

	@Post('auction/:id')
	retreatFromAuction(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<boolean> {
		return this.buyerService.retreatFromAuction(buyer, id);
	}

	@Post('auction/:id')
	saveAuctionForLater(
		@GetCurrentUserData() buyer: Buyer,
		@Param() { id }: MongoObjectIdDto,
	): Promise<boolean> {
		return this.buyerService.saveAuctionForLater(buyer, id);
	}
}
