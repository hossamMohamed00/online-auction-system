import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';
import { AuthModule } from './users/auth/auth.module';
import { AccessTokenAuthGuard, HasRoleGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { AuctionsModule } from './auctions/auctions.module';
import { GetEnvValidationSchema } from './common/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      validationSchema: GetEnvValidationSchema(),
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
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
}
