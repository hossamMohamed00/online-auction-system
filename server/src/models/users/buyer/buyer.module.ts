import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

import { Module } from '@nestjs/common';
import { ComplaintModule } from 'src/models/complaint/complaint.module';

@Module({
	imports: [ComplaintModule],
	controllers: [BuyerController],
	providers: [BuyerService],
})
export class BuyerModule {}
