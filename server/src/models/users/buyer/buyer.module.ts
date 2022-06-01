import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { ComplaintModule } from 'src/models/complaint/complaint.module';
import { WalletModule } from 'src/providers/payment/wallet.module';
import { AuctionsModule } from 'src/models/auction/auctions.module';
import { AuctionValidationService } from 'src/models/auction/auction-validation.service';
import { CategoryModule } from 'src/models/category/category.module';
import { ReviewModule } from 'src/models/review/review.module';

@Module({
	imports: [
		WalletModule,
		AuctionsModule,
		CategoryModule,
		ReviewModule,
		ComplaintModule,
	],
	controllers: [BuyerController],
	providers: [BuyerService, AuctionValidationService],
	exports: [BuyerService],
})
export class BuyerModule {}
