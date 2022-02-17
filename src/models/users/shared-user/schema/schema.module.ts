import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { sellerModelProvider } from '../providers/discriminators/discriminator.provider';
import { User, UserSchema } from './user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        // Discriminators are provided manually (see model providers)
      },
    ]),
  ],
  providers: [sellerModelProvider], // Provide it so it is injectable by getModelToken(Seller.name)]
  exports: [
    MongooseModule,
    sellerModelProvider, // Export it so it is injectable by getModelToken(Seller.name)],
  ],
})
export class SchemaModule {}
