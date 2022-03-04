import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuctionsService } from 'src/models/auction/auctions.service';
import { FilterAuctionQueryDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
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
		private readonly auctionService: AuctionsService,
		private readonly categoryService: CategoryService,
		private readonly employeeService: EmployeeService,
	) {}

	/* Handle Auctions Functions */

	/**
	 * List all auctions available
	 * @param filterAuctionQuery - Contains search criteria to search for specific auctions
	 */
	listAllAuctions(filterAuctionQuery: FilterAuctionQueryDto) {
		return this.auctionService.findAll(filterAuctionQuery);
	}

	/**
	 * Approve auction by id
	 * @param auctionId
	 */
	async approveAuction(auctionId: string): Promise<Auction> {
		const approvedAuction = await this.auctionService.approveAuction(auctionId);

		//? Return true if the auction approved successfully
		if (!approvedAuction)
			throw new BadRequestException('Cannot approve this auction right now!');

		return approvedAuction;
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
