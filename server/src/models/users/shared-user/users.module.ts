import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SchemaModule } from './schema/schema.module';

@Module({
  //* Load schema module to load all database schemas
  imports: [SchemaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
