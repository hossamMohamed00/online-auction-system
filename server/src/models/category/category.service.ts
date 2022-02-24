import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
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

    return createdCategory;
  }

  /**
   * List all categories
   */
  async listAll(name?: string) {
    let categories = name
      ? await this.categoryModel.find({ name: name.toLowerCase() })
      : await this.categoryModel.find();

    return categories;
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
   * Update a category
   * @param id  category id
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

    return category;
  }

  /**
   * Remove a category
   * @param categoryId: string
   */
  async remove(categoryId: string) {
    const category = await this.categoryModel.findByIdAndRemove(categoryId);

    if (!category) throw new NotFoundException('Category not found ❌');

    return category;
  }
}
