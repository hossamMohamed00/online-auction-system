import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import config from './config/keys';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  //? Configure the application middleware
}
