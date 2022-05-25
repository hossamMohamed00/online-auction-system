import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionsService } from 'src/models/auction/auctions.service';
import {
	FilterAuctionQueryDto,
	RejectAuctionDto,
} from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { CategoryService } from 'src/models/category/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/models/category/dto';
import { ComplaintService } from 'src/models/complaint/complaint.service';
import {
	Complaint,
	ComplaintDocument,
} from 'src/models/complaint/schema/complaint.schema';
import { CreateEmployeeDto } from '../employee/dto';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeDocument } from '../employee/schema/employee.schema';
import { FilterUsersQueryDto } from '../shared-user/dto/filter-users.dto';
import { UsersService } from '../shared-user/users.service';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AdminService {
	private logger: Logger = new Logger('admin');

	constructor(
		@InjectModel(Admin.name)
		private readonly AdminModel: Model<AdminDocument>,
		private readonly usersService: UsersService,
		private readonly auctionService: AuctionsService,
		private readonly categoryService: CategoryService,
		private readonly employeeService: EmployeeService,
		private readonly ComplaintService: ComplaintService,
	) {}
	/* Handle Users Functions */

	/**
	 * Find all users registered in the system
	 * @returns List of users
	 */
	findAllSystemUsers(filterUsersQueryDto: FilterUsersQueryDto) {
		return this.usersService.findAll(filterUsersQueryDto);
	}
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

		//TODO: Send email to inform the seller

		return approvedAuction;
	}

	/**
	 * Reject specific auction by id
	 * @param auctionId
	 * @param rejectAuctionDto - Rejection Reason
	 * @returns Updated auction
	 */
	async rejectAuction(auctionId: string, rejectAuctionDto: RejectAuctionDto) {
		const rejectedAuction = await this.auctionService.rejectAuction(
			auctionId,
			rejectAuctionDto,
		);

		//? Return true if the auction approved successfully
		if (!rejectedAuction)
			throw new BadRequestException('Cannot reject this auction right now!');

		//TODO: Send email to inform the seller

		return rejectedAuction;
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
	listAllComplaint(): Promise<ComplaintDocument[]> {
		return this.ComplaintService.FindAll();
	}
	markComplaintRead(id: String) {
		return this.ComplaintService.markComplaintAsRead(id);
	}
	deleteComplaint(id: String) {
		return this.ComplaintService.deleteComplaint(id);
	}
}
