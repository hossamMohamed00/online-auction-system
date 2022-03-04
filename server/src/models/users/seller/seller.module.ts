import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

import { Module } from '@nestjs/common';
import { AuctionsModule } from 'src/models/auction/auctions.module';

@Module({
	imports: [AuctionsModule],
	controllers: [SellerController],
	providers: [SellerService],
})
export class SellerModule {}
