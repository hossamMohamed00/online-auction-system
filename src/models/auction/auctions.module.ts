import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './schema/auction.schema';
import { ItemModule } from '../items/item.module';

@Module({
  imports: [
    ItemModule,
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
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [
    AuctionsService,
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
})
export class AuctionsModule {}
