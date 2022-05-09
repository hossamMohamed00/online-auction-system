import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import WalletService from './wallet.service';
import { Role } from 'src/models/users/shared-user/enums';
import { CreatePaymentIntent } from './dto';

@ApiTags('Wallet')
@Roles(Role.Seller, Role.Buyer)
@Controller('wallet')
export class StripeController {
	constructor(private readonly walletService: WalletService) {}

	@Post('create-payment-intent')
	createPaymentIntent(
		@Body() createPaymentIntent: CreatePaymentIntent,
		@GetCurrentUserData('_id') userId: string,
		@GetCurrentUserData('email') userEmail: string,
	) {
		return this.walletService.createPaymentIntent(
			createPaymentIntent.amount,
			createPaymentIntent.paymentMethodId,
			userId,
			userEmail,
		);
	}
}
