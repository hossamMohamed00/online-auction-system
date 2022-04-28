import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const usePaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		event.preventDefault();

		console.log(process.env.REACT_APP_API_URL);
		const amountToCharge = 100;

		const cardElement = elements.getElement(CardElement);

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
			console.log(error);
			return;
		}

		const paymentMethodId = paymentMethod.id;

		console.log('start');
		fetch(`${process.env.REACT_APP_API_URL}/wallet/charge`, {
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

		console.log('end');
	};

	return {
		handleSubmit,
	};
};

export default usePaymentForm;
