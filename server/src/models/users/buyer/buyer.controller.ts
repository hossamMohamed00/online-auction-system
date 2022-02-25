import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublicRoute } from 'src/common/decorators';
import { BuyerService } from './buyer.service';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
	constructor(private readonly buyerService: BuyerService) {}

	@Post()
	@IsPublicRoute()
	createBuyer(@Body() body: any) {
		return this.buyerService.create(body);
	}

	@Get()
	@IsPublicRoute()
	findAll() {
		return this.buyerService.findAll();
	}
}
