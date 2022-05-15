import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import WalletService from './wallet.service';
import { Role } from 'src/models/users/shared-user/enums';
import { ChargeWalletDto } from './dto';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import TransactionService from './transaction.service';

@ApiTags('Wallet')
@Roles(Role.Seller, Role.Buyer)
@Controller('wallet')
export class StripeController {
	constructor(
		private readonly walletService: WalletService,
		private readonly transactionService: TransactionService,
	) {}

	//FIXME REMOVE This route
	@Get()
	listAllWallets() {
		return this.walletService.listAllWallets();
	}

	@Get('balance')
	getWalletBalance(@GetCurrentUserData() user: User) {
		return this.walletService.getWalletBalance(user);
	}

	@Post('charge')
	chargeWallet(
		@Body() chargeWalletDto: ChargeWalletDto,
		@GetCurrentUserData() user: User,
	) {
		return this.walletService.chargeWallet(
			chargeWalletDto.amount,
			chargeWalletDto.paymentMethodId,
			user,
		);
	}

	@Get('transactions')
	listTransactionsForUser(@GetCurrentUserData() user: User) {
		return this.transactionService.listTransactionsForUser(user);
	}
}
