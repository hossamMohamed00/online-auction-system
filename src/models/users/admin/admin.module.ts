import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/models/category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
