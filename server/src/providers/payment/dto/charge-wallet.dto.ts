import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ChargeWalletDto {
	@IsString()
	@IsNotEmpty()
	paymentMethodId: string;

	@IsNumber()
	amount: number;
}

export default ChargeWalletDto;
