import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly AdminModel: Model<AdminDocument>,
  ) {}

  async create(body: any) {
    const admin = new this.AdminModel(body);
    await admin.save();

    return admin;
  }
  async findAll() {
    const admins = await this.AdminModel.find().exec();
    return admins;
  }
}
