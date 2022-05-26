import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

import { Module } from '@nestjs/common';
import { AuctionsModule } from 'src/models/auction/auctions.module';
import { CloudinaryModule } from 'src/providers/files-upload/cloudinary.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ReviewModule } from 'src/models/review/review.module';

@Module({
	imports: [
		//? Import Nestjs form data handler middleware
		NestjsFormDataModule,
		AuctionsModule,
		CloudinaryModule,
		ReviewModule,
	],
	controllers: [SellerController],
	providers: [SellerService],
})
export class SellerModule {}
