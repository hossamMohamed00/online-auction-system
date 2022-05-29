import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { Role } from '../users/shared-user/enums';
import { ComplaintService } from './complaint.service';
import { ComplaintDto, CreateComplaintDto } from './dto';
import { Complaint } from './schema/complaint.schema';

@Roles(Role.Seller, Role.Buyer)
@ApiTags('Complaint')
@Controller('Complaint')
export class ComplaintController {
	constructor(private readonly complaintService: ComplaintService) {}

	@Serialize(ComplaintDto)
	@Post('submit')
	submitNewComplaint(
		@Body() createComplaintDto: CreateComplaintDto,
		@GetCurrentUserData('_id') userId: string,
	): Promise<Complaint> {
		return this.complaintService.create(createComplaintDto, userId);
	}

	@Serialize(ComplaintDto)
	@Get('submitted')
	listMyComplaint(@GetCurrentUserData('_id') userId: string) {
		return this.complaintService.listUserComplaint(userId);
	}

	@Serialize(ComplaintDto)
	@Delete(':id')
	deleteComplaint(@Param() { id }: MongoObjectIdDto) {
		return this.complaintService.deleteComplaint(id);
	}
}
