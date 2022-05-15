import Stripe from 'stripe';

export class SuccessOrFailType {
	success: boolean;
	message: Stripe.PaymentIntent.Status;
	data: {
		paymentIntentId: string;
	};
}
