import { Expose } from 'class-transformer';
import { ExposeObjectId } from 'src/common/decorators';
import { User } from 'src/models/users/shared-user/schema/user.schema';

export class ComplaintDto {
	@Expose()
	reason: string;
	@Expose()
	from: User;
	@Expose()
	in: User;
}
