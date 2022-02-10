import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';
import { AuthModule } from './users/auth/auth.module';
import { AccessTokenAuthGuard } from './users/auth/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    AppService,
    //? Enable AccessTokenAuthGuard on all routes (Some routes will use IsPublicRoute to bypass authentication)
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
})
export class AppModule {
  //? Configure the application middleware
}
