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
import { Roles } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import { Role } from '../users/shared-user/enums';
import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Roles(Role.Admin)
@Serialize(CategoryDto)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create a new category
   * @param body : CreateCategoryDto
   * @returns created category instance
   */
  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  /**
   * Get single category by id
   * @param param category id
   * @returns category instance if found, NotFoundException thrown otherwise.
   */
  @Get(':id')
  getCategory(@Param() { id }: MongoObjectIdDto) {
    return this.categoryService.findOne(id);
  }

  /**
   * list all available categories
   * @returns Array of all categories
   */
  @Get()
  listAllCategories(@Query('name') name: string) {
    return this.categoryService.listAll(name);
  }

  @Patch(':id')
  UpdateCategory(
    @Param() { id }: MongoObjectIdDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  /**
   * Remove a category by id
   * @param param category id
   */
  @Delete(':id')
  deleteCategory(@Param() { id }: MongoObjectIdDto) {
    return this.categoryService.remove(id);
  }
}
