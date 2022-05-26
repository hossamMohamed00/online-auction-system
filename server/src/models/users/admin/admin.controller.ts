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
import { AdminService } from './admin.service';
import { Role } from 'src/models/users/shared-user/enums';
import {
	CategoryDto,
	CreateCategoryDto,
	UpdateCategoryDto,
} from 'src/models/category/dto';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { Serialize } from 'src/common/interceptors';
import {
	AuctionsBehavior,
	CategoryBehaviors,
	EmployeeBehaviors,
	UsersBehaviors,
} from './interfaces';
import { CreateEmployeeDto } from '../employee/dto';
import { EmployeeDocument } from '../employee/schema/employee.schema';
import { EmployeeDto } from '../employee/dto/employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auction } from 'src/models/auction/schema/auction.schema';
import {
	AuctionDto,
	FilterAuctionQueryDto,
	RejectAuctionDto,
} from 'src/models/auction/dto';
import { UserDto } from '../shared-user/dto';
import { User } from '../shared-user/schema/user.schema';
import { FilterUsersQueryDto } from '../shared-user/dto/filter-users.dto';
import { AdminFilterAuctionQueryDto } from './dto';
import { ManageDashboardBehavior } from './interfaces/manage-dashboard.interface';
import { AdminDashboardData } from './types/dashboard-data.type';

@ApiTags('Admin')
@Roles(Role.Admin)
@Controller('admin')
export class AdminController
	implements
		ManageDashboardBehavior,
		UsersBehaviors,
		AuctionsBehavior,
		EmployeeBehaviors,
		CategoryBehaviors
{
	constructor(private readonly adminService: AdminService) {}

	/* Handle Dashboard Behaviors */
	@Get('dashboard')
	listDashboardData(): Promise<AdminDashboardData> {
		return this.adminService.getDashboardData();
	}

	/* Handle Users Behaviors */
	/**
	 * List all system users
	 * @returns List of all users
	 */
	@Serialize(UserDto)
	@Get('users')
	findAllSystemUsers(
		@Query() filterUsersQueryDto: FilterUsersQueryDto,
	): Promise<User[]> {
		return this.adminService.findAllSystemUsers(filterUsersQueryDto);
	}

	/* Handle Auction Behaviors */
	/**
	 * List all available auctions
	 */
	@Serialize(AuctionDto)
	@Get('auction')
	listAllAuctions(
		@Query() filterAuctionQuery: AdminFilterAuctionQueryDto,
	): Promise<Auction[]> {
		return this.adminService.listAllAuctions(filterAuctionQuery);
	}

	@Serialize(AuctionDto)
	@Post('auction/approve/:id')
	approveAuction(
		@Param() { id: auctionId }: MongoObjectIdDto,
	): Promise<Auction> {
		return this.adminService.approveAuction(auctionId);
	}

	@Serialize(AuctionDto)
	@Post('auction/reject/:id')
	rejectAuction(
		@Param() { id: auctionId }: MongoObjectIdDto,
		@Body() rejectAuctionDto: RejectAuctionDto,
	) {
		return this.adminService.rejectAuction(auctionId, rejectAuctionDto);
	}

	/* Handle Employee Behaviors */

	/**
	 * Add new employee
	 * @param createEmployeeDto
	 * @returns employee document
	 */
	@Serialize(EmployeeDto)
	@Post('employee')
	addEmployee(
		@Body() createEmployeeDto: CreateEmployeeDto,
	): Promise<EmployeeDocument> {
		return this.adminService.addEmployee(createEmployeeDto);
	}

	/**
	 * List all employees
	 * @returns employee list
	 */
	@Serialize(EmployeeDto)
	@Get('employee')
	listEmployees(): Promise<EmployeeDocument[]> {
		return this.adminService.listEmployee();
	}

	/**
	 * Remove employee by id
	 * @param id: employee id
	 * @returns employee document
	 */
	@Serialize(EmployeeDto)
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
