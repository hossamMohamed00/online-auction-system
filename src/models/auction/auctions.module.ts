import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './schema/auction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
})
export class AuctionsModule {}
