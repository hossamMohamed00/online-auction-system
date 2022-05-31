/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigModule } from 'src/config/auth/auth.config.module';
import { UsersModule } from 'src/models/users/shared-user/users.module';
import { EmailModule } from 'src/providers/mail/email.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
	imports: [EmailModule, UsersModule],
	controllers: [EmailConfirmationController],
	exports: [EmailConfirmationService],
	providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
