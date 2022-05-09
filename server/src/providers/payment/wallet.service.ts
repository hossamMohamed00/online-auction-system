import { Injectable, Logger } from '@nestjs/common';
import { StripeConfigService } from 'src/config/stripe/stripe.config.service';
import Stripe from 'stripe';

/**
 * This service will interact with strip
 */

@Injectable()
export default class WalletService {
	private logger: Logger = new Logger('Stripe Service 💲🤑');
	private stripe: Stripe;

	constructor(private stripeConfigService: StripeConfigService) {
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
		this.logger.log('Creating new strip customer for ' + email + ' 😉');
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
	 * Charging the user wallet
	 * @param amount - amount of money
	 * @param paymentMethodId - id sent by our frontend app after saving the credit card details
	 * @param stripCustomerId -Stripe customer id of a user that is making the payment
	 * @returns
	 */
	public async createPaymentIntent(
		amount: number,
		paymentMethodId: string,
		stripCustomerId: string,
		customerEmail: string,
	) {
		// Create new payment intent for the user and return a PaymentIntent object.
		const paymentIntent = await this.stripe.paymentIntents.create({
			amount,
			customer: stripCustomerId,
			payment_method: paymentMethodId,
			payment_method_types: ['card'],
			currency: this.stripeConfigService.stripeCurrency,
			description: 'Charge user wallet with ' + amount,
			receipt_email: customerEmail, // Email address that the receipt for the resulting payment will be sent to.
		});

		return { clientSecret: paymentIntent.client_secret };
	}
}
