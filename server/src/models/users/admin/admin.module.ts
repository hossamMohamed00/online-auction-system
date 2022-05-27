import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/models/category/category.module';
import { EmployeeModule } from '../employee/employee.module';
import { AuctionsModule } from 'src/models/auction/auctions.module';
import { UsersModule } from '../shared-user/users.module';
import { ComplaintModule } from 'src/models/complaint/complaint.module';

@Module({
	imports: [
		UsersModule,
		AuctionsModule,
		EmployeeModule,
		CategoryModule,
		ComplaintModule,
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
