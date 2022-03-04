import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/models/category/dto';
import { CategoryDocument } from 'src/models/category/schema/category.schema';

/*
 ? This interface include all functions related to the category
 */

export interface CategoryBehaviors {
	addCategory(body: CreateCategoryDto): Promise<CategoryDocument>;
	showAllCategories(name: string): Promise<CategoryDocument[]>;
	getCategory(id: MongoObjectIdDto): Promise<CategoryDocument>;
	updateCategory(
		id: MongoObjectIdDto,
		updateCategoryDto: UpdateCategoryDto,
	): Promise<CategoryDocument>;
	deleteCategory(id: MongoObjectIdDto): Promise<CategoryDocument>;
}
