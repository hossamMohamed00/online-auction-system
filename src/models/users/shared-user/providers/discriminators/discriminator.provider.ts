import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/users/schema/user.schema';
import {
  Seller,
  SellerDocument,
  SellerSchema,
} from 'src/models/users/seller/schema/seller.schema';

export const sellerModelProvider: Provider<Model<SellerDocument>> = {
  provide: getModelToken(Seller.name),
  inject: [getModelToken(User.name)],
  useFactory: (sellerModel: Model<UserDocument>) =>
    sellerModel.discriminator<SellerDocument>(Seller.name, SellerSchema),
};
