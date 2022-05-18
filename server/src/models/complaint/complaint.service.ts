import { Injectable } from '@nestjs/common';
import { ComplaintDocument, Complaint } from './schema/complaint.schema';
import { CreateComplaintDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/shared-user/schema/user.schema';
import { from } from 'rxjs';

@Injectable()
export class ComplaintService {
	constructor(
		@InjectModel(Complaint.name)
		private readonly complaintModel: Model<ComplaintDocument>,
	) {}
	/**
	 * Create new Complaint
	 * @param createComplaintDto
	 */
	async create(createComplaintDto: CreateComplaintDto, from: String) {
		const createdComplaint: ComplaintDocument = new this.complaintModel({
			reason: createComplaintDto.reason,
			in: createComplaintDto.in,
			from,
		});

		await createdComplaint.save();

		return createdComplaint;
	}
}
