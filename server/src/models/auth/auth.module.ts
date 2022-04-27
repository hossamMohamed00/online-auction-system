import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigModule } from 'src/config/auth/auth.config.module';
import { EmailConfirmationModule } from 'src/providers/auth/verification/email-confirmation.module';
import { StripeModule } from 'src/providers/payment/stripe.module';
import { UsersModule } from '../users/shared-user/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
	imports: [
		AuthConfigModule,
		UsersModule,
		PassportModule,
		EmailConfirmationModule,
		StripeModule,
		JwtModule.register({}),
	],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
	exports: [AuthService],
})
export class AuthModule {}
