import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidController } from './bid.controller';
import { BidGateway } from './bid.gateway';
import { BidService } from './bid.service';
import { Bid, BidSchema } from './schema/bid.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Bid.name, schema: BidSchema }])],
	controllers: [BidController],
	providers: [BidService, BidGateway],
})
export class BidModule {}
