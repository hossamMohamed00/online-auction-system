import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StripeConfigService } from 'src/config/stripe/stripe.config.service';
import { Buyer } from 'src/models/users/buyer/schema/buyer.schema';
import { Seller } from 'src/models/users/seller/schema/seller.schema';
import { User } from 'src/models/users/shared-user/schema/user.schema';
import Stripe from 'stripe';
import { TransactionType } from './enums';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import TransactionService from './transaction.service';
import { SuccessOrFailType } from './types/method-return.type';

/**
 * This service will interact with strip
 */

@Injectable()
export default class WalletService {
	private logger: Logger = new Logger('Wallet Service 💲🤑');
	private stripe: Stripe;

	constructor(
		@InjectModel(Wallet.name)
		private readonly walletModel: Model<WalletDocument>,
		private readonly transactionService: TransactionService,

		private stripeConfigService: StripeConfigService,
	) {
		//* Create new strip instance and provide the secret key
		this.stripe = new Stripe(stripeConfigService.stripeSecretKey, {
			apiVersion: '2020-08-27',
		});
	}

	/**
	 * Create a Stripe customer for each of our authenticated users
	 * @param name - user name
	 * @param email - user email
	 * @param role - role of the user
	 * @returns new Stripe Customer instance
	 */
	public async createCustomer(name: string, email: string, role: string) {
		this.logger.debug('Creating new strip customer for ' + email + ' 😉');
		return this.stripe.customers.create({
			name,
			email,
			description: role,
		});
		/*
		The stripe.customers.create function calls the Stripe API
		 and returns the data bout the Stripe customer.
		*/
	}

	/**
	 * Create new wallet for the user
	 * @param user - User that owns the wallet
	 * @returns created wallet instance
	 */
	public async createWallet(user: Seller | Buyer) {
		this.logger.debug('Creating new wallet for the user 😉');
		const createdWallet = new this.walletModel({ user });

		if (!createdWallet) {
			return null;
		}

		await createdWallet.save();
		this.logger.log('Wallet created successfully with id ' + createdWallet.id);

		return createdWallet;
	}

	/**
	 * List all saved wallets in the system
	 */
	listAllWallets() {
		return this.walletModel.find({});
	}

	/**
	 * Return user wallet balance
	 * @param user
	 */
	async getWalletBalance(user: User) {
		const walletBalance = await this.walletModel.findOne(
			{ user },
			{ balance: 1, _id: 0, user: 0 }, // find only the balance field
		);

		if (walletBalance == null) {
			throw new BadRequestException('Wallet not found for that user!!');
		}

		return walletBalance;
	}

	/**
	 * Charging the user wallet
	 * @param amount - amount of money
	 * @param paymentMethodId - id sent by our frontend app after saving the credit card details
	 * @param stripCustomerId -Stripe customer id of a user that is making the payment
	 * @returns either success of fail
	 */
	public async chargeWallet(
		amount: number,
		paymentMethodId: string,
		user: any,
	) {
		const successOrFailRes: SuccessOrFailType = await this.createPaymentIntent(
			amount,
			paymentMethodId,
			user.stripeCustomerId,
			user.email,
		);

		if (successOrFailRes.success === false) {
			return successOrFailRes;
		}

		//* Increment user wallet balance
		await this.IncrementWalletBalance(user, amount);

		//TODO: Save transaction into db
		await this.transactionService.createTransaction({
			amount,
			transactionType: TransactionType.Deposit,
			senderWallet: user,
			recipientWallet: user,
			paymentIntentId: successOrFailRes.data.paymentIntentId,
		});

		return successOrFailRes;
	}

	/**
	 * Create new payment intent
	 * @returns payment intent object
	 */
	private async createPaymentIntent(
		amount: number,
		paymentMethodId: string,
		stripCustomerId: string,
		customerEmail: string,
	): Promise<SuccessOrFailType> {
		try {
			//* Create new payment intent for the user.
			const paymentIntent = await this.stripe.paymentIntents.create({
				amount: amount * 100, // Amount to charge (Multiple by 100 to convert from cent to dollar)
				customer: stripCustomerId,
				payment_method: paymentMethodId,
				payment_method_types: ['card'],
				currency: this.stripeConfigService.stripeCurrency,
				description: 'Charge user wallet with ' + amount,
				receipt_email: customerEmail, // Email address that the receipt for the resulting payment will be sent to.
				confirm: true, // Immediately confirm the charge
			});

			this.logger.debug(
				'Successfully created payment intent, ' + paymentIntent.id,
			);

			return {
				success: true,
				message: paymentIntent.status,
				data: { paymentIntentId: paymentIntent.id },
			};
		} catch (error) {
			// There are an error
			this.logger.warn('Error while charging wallet, ' + error.message);

			return { success: false, message: error.message, data: null };
		}
	}

	/**
	 * Increment the balance of the user's wallet
	 * @param user
	 * @param amount
	 */
	private async IncrementWalletBalance(user: User, amount: number) {
		const wallet = await this.walletModel.updateOne(
			{ user },
			{ $inc: { balance: amount } },
		);

		if (!wallet) {
			throw new BadRequestException('Wallet not found ❌');
		}

		this.logger.debug('User wallet balance updated ✔✔💲 ');
	}
}
