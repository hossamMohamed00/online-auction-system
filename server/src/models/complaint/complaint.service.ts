import { Injectable, Logger } from '@nestjs/common';
import { ComplaintDocument, Complaint } from './schema/complaint.schema';
import { CreateComplaintDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/shared-user/schema/user.schema';
import { from } from 'rxjs';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';

@Injectable()
export class ComplaintService {
	private logger: Logger = new Logger('ComplaintService');

	constructor(
		@InjectModel(Complaint.name)
		private readonly complaintModel: Model<ComplaintDocument>,
	) {}
	/**
	 * Create new Complaint
	 * @param createComplaintDto
	 */
	async create(createComplaintDto: CreateComplaintDto, from: User) {
		const createdComplaint: ComplaintDocument = new this.complaintModel({
			...createComplaintDto,
			from,
		});

		await createdComplaint.save();
		this.logger.log('Creat complaint' + createdComplaint);

		return createdComplaint.populate('in');
	}
	async FindAll() {
		let complaint = await this.complaintModel.find();
		return complaint;
	}
	async MarkAsRead(id: String) {
		const isReadied = await this.complaintModel.findByIdAndUpdate(id, {
			IsRead: true,
		});
		if (isReadied) {
			return { read: true };
		} else {
			return { read: false };
		}
	}
	async Delete(id: String) {
		const deleted = await this.complaintModel.findByIdAndDelete(id);
		if (deleted) {
			return {
				Deleted: true,
			};
		} else {
			return { Deleted: false };
		}
	}
}
