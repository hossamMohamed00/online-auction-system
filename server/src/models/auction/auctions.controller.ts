import { Controller, Get, Query } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { AuctionsService } from './auctions.service';
import { AuctionDto, FilterAuctionQueryDto } from './dto';
import { Auction } from './schema/auction.schema';

@Controller('auctions')
export class AuctionsController {
	constructor(private readonly auctionService: AuctionsService) {}

	@IsPublicRoute()
	@Serialize(AuctionDto)
	@Get()
	listAllAuctions(
		@Query() filterAuctionQuery: FilterAuctionQueryDto,
	): Promise<Auction[]> {
		return this.auctionService.findAll(filterAuctionQuery);
	}
}
