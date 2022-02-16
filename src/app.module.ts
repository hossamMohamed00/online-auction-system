import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './users/auth/auth.module';
import { AccessTokenAuthGuard, HasRoleGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { AuctionsModule } from './auctions/auctions.module';
import { LogsMiddleware } from './common/middlewares';
import { AppConfigModule } from './config/app/app.config.module';
import { MongoConfigModule } from './config/database/mongo.config.module';
import { MongoConfigService } from './config/database/mongo.config.service';
import { AuthConfigModule } from './config/auth/auth.config.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo.module';

@Module({
  imports: [
    //? All environment variables Loader Modules.
    AppConfigModule,
    MongoConfigModule,
    AuthConfigModule,
    //? Setup Database
    MongoDatabaseProviderModule,
    //* Main Modules
    UsersModule,
    AuthModule,
    AuctionsModule,
  ],
  providers: [
    //? Enable AccessTokenAuthGuard on all routes (Some routes will use IsPublicRoute to bypass authentication)
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
    //? Enable HasRoleGuard on all routes to check whether the user has the required role to access the endpoint or not
    {
      provide: APP_GUARD,
      useClass: HasRoleGuard,
    },
  ],
})
export class AppModule {
  //? Configure the application middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
