import { ItemService } from './item.service';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schema/item.schema';
import { CloudinaryModule } from 'src/providers/files-upload/cloudinary.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
		CloudinaryModule,
	],
	controllers: [],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
