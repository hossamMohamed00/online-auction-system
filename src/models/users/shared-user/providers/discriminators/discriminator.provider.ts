import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Admin,
  AdminDocument,
  AdminSchema,
} from 'src/models/users/admin/schema/admin.schema';
import {
  Seller,
  SellerDocument,
  SellerSchema,
} from 'src/models/users/seller/schema/seller.schema';
import { User, UserDocument } from '../../schema/user.schema';

//? This will provide admin discriminator from user schema
export const adminModelProvider: Provider<Model<AdminDocument>> = {
  provide: getModelToken(Admin.name),
  inject: [getModelToken(User.name)],
  useFactory: (adminModel: Model<UserDocument>) =>
    adminModel.discriminator<AdminDocument>(Admin.name, AdminSchema),
};

//? This will provide seller discriminator from user schema
export const sellerModelProvider: Provider<Model<SellerDocument>> = {
  provide: getModelToken(Seller.name),
  inject: [getModelToken(User.name)],
  useFactory: (sellerModel: Model<UserDocument>) =>
    sellerModel.discriminator<SellerDocument>(Seller.name, SellerSchema),
};
