import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>
  ) {}

  /**
   * Create new user
   * @param createUserDto
   * @returns instance of the created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  /**
   * Find all users
   * @returns List of all existing users
   */
  async findAll(): Promise<User[]> {
    const users = await this.usersModel.find().exec();
    console.log(users);

    return users;
  }

  /**
   * Find user by id
   * @param _id
   * @returns User instance if found, NotFoundException thrown otherwise.
   */
  async findOne(_id: string) {
    const user = await this.usersModel.findById(_id).exec();
    if (!user) throw new NotFoundException('User not found ❌');
    return user;
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate(_id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
