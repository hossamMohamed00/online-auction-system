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
	 * @param from
	 * @returns complaint
	 */
	async create(createComplaintDto: CreateComplaintDto, from: User) {
		this.logger.log('in' + createComplaintDto.in);
		const createdComplaint: ComplaintDocument = new this.complaintModel({
			reason: createComplaintDto.reason,
			in: createComplaintDto.in,
			from,
		});

		await createdComplaint.save();
		// this.logger.log('Creat complaint' + createdComplaint);

		return createdComplaint.populate('in');
	}
	/**
	 *
	 * @returns all complaint
	 */
	async FindAll() {
		let complaint = await this.complaintModel.find();
		return complaint;
	}
	/**
	 *
	 * @param id
	 * @returns complaint is readied
	 */
	async markComplaintAsRead(id: String) {
		const isReadied = await this.complaintModel.findByIdAndUpdate(id, {
			IsRead: true,
		});
		if (isReadied) {
			return { read: true };
		} else {
			return { read: false };
		}
	}
	/**
	 *
	 * @param id
	 * @returns deleted complaint
	 */
	async deleteComplaint(id: String) {
		const deleted = await this.complaintModel.findByIdAndDelete(id);
		if (deleted) {
			return {
				Deleted: true,
			};
		} else {
			return { Deleted: false };
		}
	}
	/**
	 *
	 * @param user
	 * @return all complaint of this usr
	 */
	async listMyComplaint(from: string) {
		const MyComplaint = await this.complaintModel.find({ from });
		this.logger.log(MyComplaint);
		return MyComplaint;
	}
}
