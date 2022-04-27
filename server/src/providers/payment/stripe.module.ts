import { Module } from '@nestjs/common';
import { StripeConfigModule } from 'src/config/stripe/stripe.config.module';
import StripeService from './stripe.service';

@Module({
	imports: [StripeConfigModule],
	controllers: [],
	providers: [StripeService],
	exports: [StripeService],
})
export class StripeModule {}
