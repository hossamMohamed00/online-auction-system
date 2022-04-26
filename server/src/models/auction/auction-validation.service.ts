import { Injectable } from '@nestjs/common';
import { HandleDateService } from 'src/common/utils';
import { CategoryService } from '../category/category.service';
import { ItemService } from '../items/item.service';
import { CreateAuctionDto } from './dto';

@Injectable()
export class AuctionValidationService {
	constructor(
		private readonly itemService: ItemService,
		private readonly categoryService: CategoryService,
	) {}

	public async validateCreateAuctionData(createAuctionDto: CreateAuctionDto) {
		const validationResult = { success: true, message: undefined };

		//* Get the item data and category data
		const {
			item: itemData,
			category: categoryId,
			startDate,
			...restAuctionData
		} = createAuctionDto;

		//? Ensure that the start date is valid
		const isValidStartDate =
			HandleDateService.isValidAuctionStartDate(startDate);

		if (!isValidStartDate) {
			validationResult.success = false;
			validationResult.message =
				'Invalid start date 😪, It must be between Today and up to 2 months 📅';

			return validationResult;
		}

		//? Ensure that the category exists
		const isCategoryExists = await this.categoryService.isExists(categoryId);
		if (!isCategoryExists) {
			validationResult.success = false;
			validationResult.message = 'Category not found ❌.';

			return validationResult;
		}

		return validationResult;
	}
}
