import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

import { Module } from '@nestjs/common';
import { WalletModule } from 'src/providers/payment/wallet.module';
import { AuctionsModule } from 'src/models/auction/auctions.module';
import { AuctionValidationService } from 'src/models/auction/auction-validation.service';
import { CategoryModule } from 'src/models/category/category.module';

@Module({
	imports: [WalletModule, AuctionsModule, CategoryModule],
	controllers: [BuyerController],
	providers: [BuyerService, AuctionValidationService],
	exports: [BuyerService],
})
export class BuyerModule {}
