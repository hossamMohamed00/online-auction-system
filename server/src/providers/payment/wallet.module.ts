import { StripeController as WalletController } from './wallet.controller';
import { Module } from '@nestjs/common';
import { StripeConfigModule } from 'src/config/stripe/stripe.config.module';
import WalletService from './wallet.service';

@Module({
	imports: [StripeConfigModule],
	controllers: [WalletController],
	providers: [WalletService],
	exports: [WalletService],
})
export class WalletModule {}
