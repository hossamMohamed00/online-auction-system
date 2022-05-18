import { Expose } from 'class-transformer';
import { ExposeObjectId } from 'src/common/decorators';

export class ComplaintDto {
	@Expose()
	@ExposeObjectId()
	_id: string;

	@Expose()
	Reason: string;
}
