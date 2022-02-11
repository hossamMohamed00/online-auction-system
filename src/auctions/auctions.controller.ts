import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  GetCurrentUserData,
  IsPublicRoute,
  Roles,
} from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { User } from 'src/users/entities/user.schema';
import { Role } from 'src/users/enums';
import { AuctionsService } from './auctions.service';
import {
  AuctionDto,
  AuctionId,
  CreateAuctionDto,
  UpdateAuctionDto,
} from './dto';

@Serialize(AuctionDto)
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Roles(Role.Seller)
  @Post()
  create(
    @Body() createAuctionDto: CreateAuctionDto,
    @GetCurrentUserData() user: User,
  ) {
    return this.auctionsService.create(createAuctionDto, user);
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
