import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import {
	Complaint,
	ComplaintDocument,
} from 'src/models/complaint/schema/complaint.schema';

export interface ComplaintBehavior {
	//* List all Complaint for the admin
	listAllComplaint(): Promise<ComplaintDocument[]>;
}
