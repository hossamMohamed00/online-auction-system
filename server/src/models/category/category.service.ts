import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { AuctionDocument } from '../auction/schema/auction.schema';
import { UpdateCategoryDto } from './dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';
import { AuctionsService } from 'src/models/auction/auctions.service';

@Injectable()
export class CategoryService {
	private logger: Logger = new Logger(CategoryService.name);

	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<CategoryDocument>,
		private readonly auctionService: AuctionsService,
	) {}

	/**
	 * Create new category
	 * @param createCategoryDto
	 */
	async create(createCategoryDto: CreateCategoryDto) {
		//? Ensure that there is no category with the same name already exists.
		const isAlreadyExists = await this.categoryModel.findOne({
			name: createCategoryDto.name,
		});
		if (isAlreadyExists)
			throw new BadRequestException(
				'Category withe that name already exists ❌.',
			);

		const createdCategory: CategoryDocument = new this.categoryModel(
			createCategoryDto,
		);

		await createdCategory.save();

		this.logger.log('New Category created successfully ✔');

		return createdCategory;
	}

	/**
	 * List all categories
	 */
	async listAll(name?: string) {
		let categories = name
			? await this.categoryModel.find({ name: name.toLowerCase() })
			: await this.categoryModel.find();

		this.logger.log('Retrieving all saved categories...');

		return categories;
	}

	/**
	 * List all auction related to specific category
	 * @param categoryId
	 * @returns array of auctions
	 */
	async getAuctionsOfCategory(categoryId: string): Promise<AuctionDocument[]> {
		//* Find the category
		const category = await this.findOne(categoryId);

		if (!category) {
			throw new BadRequestException('Category not found ❌');
		}

		//* Populate the virtual auctions property
		await category.populate({
			path: 'auctions',
			populate: [
				{
					path: 'item',
				},
				{
					path: 'category',
				},
			],
		});

		// FIXME: Fix this error
		// @ts-ignore: Unreachable code error
		const auctions: AuctionDocument[] = category.auctions;

		this.logger.log('Retrieving all auctions for ' + category.name);

		return auctions;
	}

	/**
	 * Find a category by id
	 * @param categoryId
	 * @returns Category instance if found
	 */
	async findOne(categoryId: string) {
		const category = await this.categoryModel.findById(categoryId);
		if (!category) throw new NotFoundException('Category not found ❌');

		return category;
	}

	/**
	 * Check if category exists in the database or not
	 * @param categoryId
	 * @returns true if category exists, false otherwise
	 */
	async isExists(categoryId: ObjectId): Promise<boolean> {
		const count = await this.categoryModel.countDocuments({ _id: categoryId });
		return count > 0;
	}

	/**
	 * Update a category
	 * @param categoryId  category id
	 * @param updateCategoryDto
	 * @returns the updated category instance
	 */
	async update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
		const category = await this.categoryModel.findByIdAndUpdate(
			categoryId,
			updateCategoryDto,
			{ new: true },
		);

		if (!category) throw new NotFoundException('Category not found ❌.');

		this.logger.log('Category updated successfully ✔');

		return category;
	}

	/**
	 * Remove a category
	 * @param categoryId: string
	 */
	async remove(categoryId: string) {
		//? Ensure before remove that there is no upcoming or ongoing auctions related to this category
		const isExists =
			await this.auctionService.isThereAnyRunningAuctionRelatedToCategory(
				categoryId,
			);

		if (isExists) {
			throw new BadRequestException(
				'There are ongoing or upcoming auctions related to this category ❌.',
			);
		}

		//* Find the category and delete it
		const category = await this.categoryModel.findOne({ _id: categoryId });

		if (!category) throw new NotFoundException('Category not found ❌');

		//* Remove the category using this approach to fire the pre hook event
		await category.remove();

		return category;
	}

	/**
	 * Return categories count to be displayed in admin dashboard
	 */
	async getCategoriesCount() {
		//* Get all categories count
		const categoriesCount = await this.categoryModel.countDocuments();

		return categoriesCount;
	}
}
