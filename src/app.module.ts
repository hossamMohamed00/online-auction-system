import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  //? Configure the application middleware
}
