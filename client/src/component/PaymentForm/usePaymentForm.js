import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const usePaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async e => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			console.log('Stripe.js has not yet loaded.');
			return;
		}

		//* Get the card element
		const cardElement = elements.getElement(CardElement);

		//* Create new paymentMethod from Stripe API
		const {
			paymentMethod,
			error: stripeError,
		} = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
			billing_details: {
				name: 'Hossam',
				email: 'a01122882174@gmail.com',
				phone: '01156826636',
				address: 'cairo',
			},
		});

		if (stripeError || !paymentMethod) {
			console.log({ stripeError });
			return;
		}

		//? Create payment intent in the server
		const { success, message } = await fetch(
			`${process.env.REACT_APP_API_URL}/wallet/charge`,
			{
				method: 'POST',
				body: JSON.stringify({
					paymentMethodId: paymentMethod.id,
					amount: 100,
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjdmZWI3MDlkNmIxMDgwZGI4ZGI0MDgiLCJlbWFpbCI6ImJ1eWVyQGVtYWlsLmNvbSIsImlhdCI6MTY1MjU1MDY5MCwiZXhwIjoxMDY1MjU1MDY5MH0.EeAvFyRIN9TS6qGr5ua4ciKlral4xq057LefDz4IRZ8`,
				},
			},
			).then(res => res.json());

			if (success === false) {
				console.log({ message });
				return;
		}

		console.log('Charge wallet done successfully ✔✔✔, status is ' + message);

		// //? Confirm the payment on the client
		// const { error, paymentIntent } = await stripe.confirmCardPayment(
		// 	clientSecret,
		// 	{
		// 		payment_method: paymentMethod.id,
		// 	},
		// );

		// if (error) {
		// 	// Show error to customer (e.g., insufficient funds)
		// 	console.log({ error: error.message });
		// 	return;
		// }

		// // Show a success message to your customer
		// console.log(`Payment ${paymentIntent.id}: ${paymentIntent.status}`);
	};

	return {
		handleSubmit,
	};
};

export default usePaymentForm;
