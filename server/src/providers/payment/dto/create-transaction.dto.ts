import {
	IsString,
	IsNotEmpty,
	IsNumber,
	Min,
	Max,
	IsEnum,
} from 'class-validator';
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
	recipient: User | string;

	@IsEnum(TransactionType)
	transactionType: TransactionType;

	@IsNotEmpty()
	paymentIntentId: string;
}
