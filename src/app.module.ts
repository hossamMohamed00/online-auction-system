import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {
  //? Configure the application middleware
}
