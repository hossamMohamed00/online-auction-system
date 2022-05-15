import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

import { Module } from '@nestjs/common';
import { WalletModule } from 'src/providers/payment/wallet.module';

@Module({
	imports: [WalletModule],
	controllers: [BuyerController],
	providers: [BuyerService],
})
export class BuyerModule {}
