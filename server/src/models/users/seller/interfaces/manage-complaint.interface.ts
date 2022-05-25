import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateComplaintDto } from 'src/models/complaint/dto';
import {
	Complaint,
	ComplaintDocument,
} from 'src/models/complaint/schema/complaint.schema';
import { UserDocument } from '../../shared-user/schema/user.schema';

export interface ComplaintBehavior {
	CreateCompliant(body: CreateComplaintDto, user: UserDocument);
}
