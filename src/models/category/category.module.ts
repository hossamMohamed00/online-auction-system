import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}