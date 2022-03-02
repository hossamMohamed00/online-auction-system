import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './schema/auction.schema';
import { ItemModule } from '../items/item.module';
import { CategoryModule } from '../category/category.module';

@Module({
	imports: [
		ItemModule,
		CategoryModule,
		MongooseModule.forFeatureAsync([
			{
				name: Auction.name,
				useFactory: () => {
					const schema = AuctionSchema;
					schema.plugin(require('mongoose-autopopulate'));
					return schema;
				},
			},
		]),
	],
	providers: [AuctionsService],
	exports: [
		AuctionsService,
		MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
	],
})
export class AuctionsModule {}
