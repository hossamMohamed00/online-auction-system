import { Expose } from 'class-transformer';
import { ExposeObjectId } from '../../../common/decorators/mongo/expose-id.decorator';

/**
 * Category dto - Describe what category data to be sent over the network
 */
export class CategoryDto {
  @Expose()
  @ExposeObjectId()
  _id: string;

  @Expose()
  name: string;
}
