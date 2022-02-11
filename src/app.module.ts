import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';
import { AuthModule } from './users/auth/auth.module';
import { AccessTokenAuthGuard, HasRoleGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string(),
        PORT: Joi.number(),
        DATABASE_CONNECTION_STRING: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    UsersModule,
    AuthModule,
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
