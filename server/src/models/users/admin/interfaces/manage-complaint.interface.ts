import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import {
	Complaint,
	ComplaintDocument,
} from 'src/models/complaint/schema/complaint.schema';
import { AdminFilterComplaintQueryDto } from '../dto';

export interface AdminComplaintsBehavior {
	//* List all Complaint for the admin
	listAllComplaint(
		adminFilterComplaintQueryDto: AdminFilterComplaintQueryDto,
	): Promise<Complaint[]>;

	//* Mark an complaint as read
	markAsRead(complaintId: MongoObjectIdDto): Promise<{ success: boolean }>;

	//* Delete single complaint
	deleteComplaint(complaintId: MongoObjectIdDto): Promise<Complaint>;
}
