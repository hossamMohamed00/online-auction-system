import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/models/category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/models/category/dto';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly AdminModel: Model<AdminDocument>,
    private readonly categoryService: CategoryService,
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

  /* Handle Category Functions */
  /**
   * Creates new category
   * @param body - category's data
   * @returns  instance of the created category
   */
  createCategory(body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  /**
   * List all categories found or filter by name
   * @param name - Optional category name
   * @returns Array of all categories
   */
  listAllCategories(name?: string) {
    return this.categoryService.listAll(name);
  }

  /**
   * Find one category by id
   * @param id category id
   * @returns Matched category if found
   */
  findOneCategory(id: string) {
    return this.categoryService.findOne(id);
  }

  /**
   * Updates category
   * @param id category id
   * @param updateCategoryDto new data
   * @returns  instance of the updated category
   */
  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * Removes category
   * @param id
   * @returns instance of the category
   */
  removeCategory(id: string) {
    return this.categoryService.remove(id);
  }
}
