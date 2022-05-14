import { StripeController as WalletController } from './wallet.controller';
import { Module } from '@nestjs/common';
import { StripeConfigModule } from 'src/config/stripe/stripe.config.module';
import WalletService from './wallet.service';
import { Wallet, WalletSchema } from './schema/wallet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		StripeConfigModule,
		MongooseModule.forFeatureAsync([
			{
				name: Wallet.name,
				useFactory: () => {
					const schema = WalletSchema;
					//? Add the auto-populate plugin
					schema.plugin(require('mongoose-autopopulate'));
					return schema;
				},
			},
		]),
	],
	controllers: [WalletController],
	providers: [WalletService],
	exports: [WalletService],
})
export class WalletModule {}
