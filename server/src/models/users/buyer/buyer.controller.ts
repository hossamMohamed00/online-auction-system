import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, IsPublicRoute } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { CreateComplaintDto } from 'src/models/complaint/dto';
import { UserDocument } from '../shared-user/schema/user.schema';
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
	/**
	 *
	 * @param body
	 * @param user
	 * @returns Created Complaint
	 */
	// @Serialize(ComplaintDto)
	@Post('complaint')
	CreateCompliant(
		@Body() body: CreateComplaintDto,
		@GetCurrentUserData() user: UserDocument,
	) {
		return this.buyerService.createComplaint(body, user);
	}
}
