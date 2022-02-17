import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @IsPublicRoute()
  createSeller(@Body() body: any) {
    return this.adminService.create(body);
  }

  @Get()
  @IsPublicRoute()
  findAll() {
    return this.adminService.findAll();
  }
}
