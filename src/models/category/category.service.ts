import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  async listAll() {
    return this.categoryModel.find();
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
