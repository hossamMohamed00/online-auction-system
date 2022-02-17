import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @IsPublicRoute()
  createSeller(@Body() body: any) {
    return this.sellerService.create(body);
  }

  @Get()
  @IsPublicRoute()
  findAll() {
    return this.sellerService.findAll();
  }
}
