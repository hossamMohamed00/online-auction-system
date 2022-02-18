import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IsPublicRoute, Roles } from 'src/common/decorators';
import { AdminService } from './admin.service';
import { Role } from 'src/models/users/shared-user/enums';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/models/category/dto';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { CategoryBehaviors, EmployeeBehaviors } from './interfaces';
import { CreateEmployeeDto } from '../employee/dto';
import { EmployeeDocument } from '../employee/schema/employee.schema';
@Roles(Role.Admin)
@Controller('admin')
export class AdminController implements EmployeeBehaviors, CategoryBehaviors {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @IsPublicRoute()
  createAdmin(@Body() body: any) {
    return this.adminService.create(body);
  }

  @Get()
  @IsPublicRoute()
  findAll() {
    return this.adminService.findAll();
  }

  /* Handle Employee Behaviors */
  @Post('employee')
  addEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    return this.adminService.addEmployee(createEmployeeDto);
  }
  @Delete('employee/:id')
  removeEmployee(@Param() { id }: MongoObjectIdDto): Promise<EmployeeDocument> {
    return this.adminService.removeEmployee(id);
  }
  /* Handle Category Functions */
  /**
   * Create a new category
   * @param body : CreateCategoryDto
   * @returns created category instance
   */
  @Serialize(CategoryDto)
  @Post('category')
  addCategory(@Body() body: CreateCategoryDto) {
    return this.adminService.createCategory(body);
  }

  /**
   * Get single category by id
   * @param param category id
   * @returns category instance if found, NotFoundException thrown otherwise.
   */
  @Serialize(CategoryDto)
  @Get('category/:id')
  getCategory(@Param() { id }: MongoObjectIdDto) {
    return this.adminService.findOneCategory(id);
  }

  /**
   * list all available categories
   * @returns Array of all categories
   */
  @Serialize(CategoryDto)
  @Get('category')
  showAllCategories(@Query('name') name: string) {
    return this.adminService.listAllCategories(name);
  }

  /**
   * Update existing category by id
   * @param id : category id
   * @param updateCategoryDto : New category data
   */
  @Serialize(CategoryDto)
  @Patch('category/:id')
  updateCategory(
    @Param() { id }: MongoObjectIdDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.adminService.updateCategory(id, updateCategoryDto);
  }

  /**
   * Remove a category by id
   * @param param category id
   */
  @Serialize(CategoryDto)
  @Delete('category/:id')
  deleteCategory(@Param() { id }: MongoObjectIdDto) {
    return this.adminService.removeCategory(id);
  }
}
