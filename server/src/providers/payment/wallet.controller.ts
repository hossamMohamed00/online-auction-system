import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import WalletService from './wallet.service';
import { Role } from 'src/models/users/shared-user/enums';
import { ChargeWalletDto } from './dto';

@ApiTags('Wallet')
@Roles(Role.Seller, Role.Buyer)
@Controller('wallet')
export class StripeController {
	constructor(private readonly walletService: WalletService) {}

	@Post()
	async createCharge(
		@Body() chargeWalletDto: ChargeWalletDto,
		@GetCurrentUserData('_id') userId: string,
	) {
		await this.walletService.chargeWallet(
			chargeWalletDto.amount,
			chargeWalletDto.paymentMethodId,
			userId,
		);
	}
}