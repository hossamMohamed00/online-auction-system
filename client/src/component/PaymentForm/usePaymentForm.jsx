import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function usePaymentForm() {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		event.preventDefault();

		const amountToCharge = 100;

		const cardElement = elements?.getElement(CardElement);

		if (!stripe || !elements || !cardElement) {
			return;
		}

		// send data it to the Stripe API to get paymentMethod back from Stripe API
		const stripeResponse = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		const { error, paymentMethod } = stripeResponse;

		if (error || !paymentMethod) {
			return;
		}

		const paymentMethodId = paymentMethod.id;

		fetch(`${process.env.NEST_APP_API_URL}/wallet/charge`, {
			method: 'POST',
			body: JSON.stringify({
				paymentMethodId,
				amount: amountToCharge,
			}),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	return {
		handleSubmit,
	};
}

export default usePaymentForm;
