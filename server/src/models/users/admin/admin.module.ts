import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/models/category/category.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [EmployeeModule, CategoryModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
