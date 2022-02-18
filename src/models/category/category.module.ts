import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
