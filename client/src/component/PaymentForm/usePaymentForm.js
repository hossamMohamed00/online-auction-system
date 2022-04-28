import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const usePaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		event.preventDefault();

		const amountToCharge = 10000;

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

		console.log('Start Charge');

		fetch(`${process.env.REACT_APP_API_URL}/wallet/charge`, {
			method: 'POST',
			body: JSON.stringify({
				paymentMethodId,
				amount: amountToCharge,
			}),
			credentials: 'include',
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjY4YzY3N2NiYjdiNDEzZTEyMjQ5YmMiLCJlbWFpbCI6ImJ1eWVyQGVtYWlsLmNvbSIsImlhdCI6MTY1MTExOTc1MCwiZXhwIjoxMDY1MTExOTc1MH0.JDRqtQCY03dhjltd-p7snit_AJvYAH9PustUKK2euQA`,
				'Content-Type': 'application/json',
			},
		});
	};

	return {
		handleSubmit,
	};
};

export default usePaymentForm;
