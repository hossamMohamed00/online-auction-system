import { Expose } from 'class-transformer';
import { ExposeObjectId } from 'src/common/decorators';

export class ComplaintDto {
	@Expose()
	reason: string;
	@Expose()
	from: string;
	@Expose()
	in: string;
}
