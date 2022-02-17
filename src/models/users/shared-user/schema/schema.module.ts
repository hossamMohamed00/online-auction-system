import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  adminModelProvider,
  sellerModelProvider,
} from '../providers/discriminators/discriminator.provider';
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
  providers: [
    adminModelProvider, // Provide it so it is injectable by getModelToken(Admin.name)]
    sellerModelProvider, // Provide it so it is injectable by getModelToken(Seller.name)]
  ],
  exports: [
    MongooseModule,
    adminModelProvider, // Export it so it is injectable by getModelToken(Admin.name)],
    sellerModelProvider, // Export it so it is injectable by getModelToken(Seller.name)],
  ],
})
export class SchemaModule {}
