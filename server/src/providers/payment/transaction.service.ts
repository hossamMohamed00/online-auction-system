import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto';

import { Transaction, TransactionDocument } from './schema';

@Injectable()
export default class TransactionService {
	private logger: Logger = new Logger(TransactionService.name);

	constructor(
		@InjectModel(Transaction.name)
		private readonly transactionModel: Model<TransactionDocument>,
	) {}

	/**
	 * Create new transaction
	 * @param createTransactionDto
	 * @return created transaction if done successfully
	 */
	async createTransaction(createTransactionDto: CreateTransactionDto) {
		const createTransaction = new this.transactionModel(createTransactionDto);

		if (!createTransaction) {
			throw new Error('Cannot create transaction right now ❌❌');
		}

		this.logger.debug('New transaction created and saved in db. ✔✔');

		await createTransaction.save();

		return createTransaction;
	}
}
