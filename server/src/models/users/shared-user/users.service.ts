import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/models/category/category.service';
import { UpdateUserDto } from './dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
		private readonly categoryService: CategoryService,
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
		const user = await this.usersModel.findById(_id).exec();
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
		return user;
	}

	/* Category functions */
	async getAuctionsOfCategory(categoryId: string) {
		const categories = await this.categoryService.getAuctionsOfCategory(
			categoryId,
		);

		console.log({ categories });

		return categories;
	}
}
