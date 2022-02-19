import { Expose } from 'class-transformer';
import { ExposeObjectId } from 'src/common/decorators';
import { Category } from 'src/models/category/schema/category.schema';
import { ItemStatus } from '../enums/item-status.enum';

export class ItemDto {
  @Expose()
  @ExposeObjectId()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  shortDescription: string;

  @Expose()
  detailedDescription: string;

  @Expose()
  brand?: string;

  @Expose()
  status: ItemStatus;

  @Expose()
  color?: string;

  @Expose()
  investigationLocation?: string; // Location on map

  @Expose()
  category: Category;
}
