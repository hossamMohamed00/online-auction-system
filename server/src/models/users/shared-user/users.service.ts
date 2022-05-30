import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/models/category/category.service';
import { FilterUsersQueryDto } from './dto/filter-users.dto';
import { Role } from './enums';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
	) {}

	/**
	 * Find all users
	 * @returns List of all existing users
	 */
	async findAll(filterUsersQueryDto?: FilterUsersQueryDto): Promise<User[]> {
		const users = await this.usersModel.find(filterUsersQueryDto);
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

	async findByName(name: string) {
		const user = await this.usersModel.findOne({ name }).exec();
		if (user) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Save user verification code in user document
	 * @param email - user email
	 * @param verificationCode - generated verification code
	 */
	async handleNewVerificationCode(email: string, verificationCode: number) {
		await this.usersModel.findOneAndUpdate(
			{ email },
			{
				emailVerificationCode: verificationCode,
			},
		);
	}

	/**
	 * Set the isEmailConfirmed to true
	 * @param email
	 */
	async markEmailAsConfirmed(email: string) {
		const user = await this.usersModel.findOneAndUpdate(
			{ email },
			{ isEmailConfirmed: true },
			{ new: true },
		);

		return user;
	}

	/**
	 * Get users count to be displayed in admin dashboard
	 */
	async getUsersCount(): Promise<{
		totalUsers: number;
		adminsCount: number;
		employeesCount: number;
		sellersCount: number;
		buyersCount: number;
	}> {
		//* Get the users documents
		const users = await this.usersModel.find();

		//* Get the users count
		const totalUsers = users.length;

		//* Get the admins count
		const adminsCount = users.filter(user => user.role === Role.Admin).length;

		//* Get the employees count
		const employeesCount = users.filter(
			user => user.role === Role.Employee,
		).length;

		//* Get the sellers count
		const sellersCount = users.filter(user => user.role === Role.Seller).length;

		//* Get the buyers count
		const buyersCount = users.filter(user => user.role === Role.Buyer).length;

		return {
			totalUsers,
			adminsCount,
			employeesCount,
			sellersCount,
			buyersCount,
		};
	}
}
