import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetCurrentUserData, IsPublicRoute, Roles } from 'src/common/decorators';
import { Role } from 'src/users/enums';
import { AuctionsService } from './auctions.service';
import { AuctionId, CreateAuctionDto, UpdateAuctionDto } from './dto';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Roles(Role.Seller)
  @Post()
  create(
    @Body() createAuctionDto: CreateAuctionDto,
    @GetCurrentUserData('_id') userId: string,
  ) {
    return this.auctionsService.create(createAuctionDto, userId);
  }

  @IsPublicRoute()
  @Get()
  findAll() {
    return this.auctionsService.findAll();
  }

  @IsPublicRoute()
  @Get(':id')
  findOne(@Param() { id }: AuctionId) {
    return this.auctionsService.findById(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') { id }: AuctionId,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return this.auctionsService.update(id, updateAuctionDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') { id }: AuctionId) {
    return this.auctionsService.remove(id);
  }
}
