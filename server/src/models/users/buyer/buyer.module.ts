import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

import { Module } from '@nestjs/common';
import { WalletModule } from 'src/providers/payment/wallet.module';
import { AuctionsModule } from 'src/models/auction/auctions.module';

@Module({
	imports: [WalletModule, AuctionsModule],
	controllers: [BuyerController],
	providers: [BuyerService],
})
export class BuyerModule {}
