import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>
  ) {}

  /**
   * Find all users
   * @returns List of all existing users
   */
  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find().exec();
    return users;
  }

  /**
   * Find user by id
   * @param _id
   * @returns User instance if found, NotFoundException thrown otherwise.
   */
  async findById(_id: string) {
    const user = await this.usersModel.findOne({}).exec();
    if (!user) throw new NotFoundException('User not found ❌');
    return user;
  }

  /**
   * Find user by email
   * @param email
   * @returns User instance if found, NotFoundException thrown otherwise.
   */
  async findByEmail(email: string) {
    const user = await this.usersModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found ❌');
    return user;
  }

  /**
   * Update user details
   * @param _id - User id
   * @param updateUserDto - Dto for user's properties to be updated
   * @returns updated user instance
   */
  async update(_id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersModel.findByIdAndUpdate(_id, updateUserDto, {
      new: true
    });

    if (!user) throw new NotFoundException('User not found ❌');

    return user;
  }

  /**
   * Remove user by id
   * @param _id - User id
   * @returns Deleted user instance
   */
  async remove(_id: string) {
    const user = await this.usersModel.findByIdAndRemove(_id);
    if (!user) throw new NotFoundException('User not found ❌');

    return user;
  }
}
