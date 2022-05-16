import {
	IsString,
	IsNotEmpty,
	IsNumber,
	Min,
	Max,
	IsEnum,
} from 'class-validator';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import { TransactionType } from '../enums';

export class CreateTransactionDto {
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	amount: number;

	@IsNotEmpty()
	sender: User;

	@IsNotEmpty()
	recipient: User;

	@IsEnum(TransactionType)
	transactionType: TransactionType;

	@IsNotEmpty()
	paymentIntentId: string;
}
