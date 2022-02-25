import { ChatGateway } from './models/chat/chat.gateway';
import { ChatModule } from './models/chat/chat.module';
import { CategoryModule } from './models/category/category.module';
import { ItemModule } from './models/items/item.module';
import { SchemaModule } from './models/users/shared-user/schema/schema.module';
import { SellerModule } from './models/users/seller/seller.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './models/auth/auth.module';
import { AccessTokenAuthGuard, HasRoleGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { AuctionsModule } from './models/auction/auctions.module';
import { LogsMiddleware } from './common/middlewares';
import { AppConfigModule } from './config/app/app.config.module';
import { MongoConfigModule } from './config/database/mongo.config.module';
import { AuthConfigModule } from './config/auth/auth.config.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/mongo.module';
import { UsersModule } from './models/users/shared-user/users.module';
import { AdminModule } from './models/users/admin/admin.module';
import { BuyerModule } from './models/users/buyer/buyer.module';
import { EmployeeModule } from './models/users/employee/employee.module';

@Module({
	imports: [
		ChatModule,
		CategoryModule,
		ItemModule,
		//? Load all user related modules
		SchemaModule,
		AdminModule,
		EmployeeModule,
		SellerModule,
		BuyerModule,
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
		ChatGateway,
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
