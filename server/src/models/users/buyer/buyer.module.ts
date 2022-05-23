import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

import { Module } from '@nestjs/common';
import { ReviewModule } from 'src/models/review/review.module';

@Module({
	imports: [ReviewModule],
	controllers: [BuyerController],
	providers: [BuyerService],
})
export class BuyerModule {}
