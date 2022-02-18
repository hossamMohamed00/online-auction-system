import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CategoryService } from 'src/models/category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/models/category/dto';
import { CreateEmployeeDto } from '../employee/dto';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeDocument } from '../employee/schema/employee.schema';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private readonly AdminModel: Model<AdminDocument>,
    private readonly categoryService: CategoryService,
    private readonly employeeService: EmployeeService,
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

  /* Handle Employee Functions */

  /**
   * Add new employee
   * @param createEmployeeDto Emp data
   * @returns employee instance
   */
  addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeDocument> {
    return this.employeeService.create(createEmployeeDto);
  }

  /**
   * List all employees
   */
  listEmployee(): Promise<EmployeeDocument[]> {
    return this.employeeService.listAll();
  }

  /**
   * Remove employee with id
   * @param id Employee id
   * @returns Deleted employee document
   */
  removeEmployee(id: string): Promise<EmployeeDocument> {
    return this.employeeService.remove(id);
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
