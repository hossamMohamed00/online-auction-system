import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from 'src/models/items/dto';
export class UpdateItemDto extends PartialType(CreateItemDto) {}
