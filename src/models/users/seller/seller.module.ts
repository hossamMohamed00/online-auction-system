import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
