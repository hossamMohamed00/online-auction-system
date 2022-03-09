/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigModule } from 'src/config/auth/auth.config.module';
import { EmailModule } from 'src/providers/mail/email.module';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
	imports: [JwtModule.register({}), EmailModule, AuthConfigModule],
	exports: [EmailConfirmationService],
	providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
