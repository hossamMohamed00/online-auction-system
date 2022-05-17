import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AuctionRoomService } from './auction-room.service';
import { BidController } from './bid.controller';
import { BidGateway } from './bid.gateway';
import { BidService } from './bid.service';
import { Bid, BidSchema } from './schema/bid.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }]),
		AuthModule,
		AuctionRoomService,
	],
	controllers: [BidController],
	providers: [BidService, BidGateway, AuctionRoomService],
})
export class BidModule {}
