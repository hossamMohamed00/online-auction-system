import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

const PaymentForm = () => {
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

		console.log({ paymentMethodId: paymentMethod.id });

		//? Create payment intent in the server
		const { error: serverError, clientSecret } = await fetch(
			`${process.env.REACT_APP_API_URL}/wallet/create-payment-intent`,
			{
				method: 'POST',
				body: JSON.stringify({
					paymentMethodId: paymentMethod.id,
					amount: 100,
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mjc5NWZlNWM2ZjJiMWRkNGRjMWY5NzAiLCJlbWFpbCI6ImVicmFtQGVtYWlsLmNvbSIsImlhdCI6MTY1MjEyMTU3MywiZXhwIjoxMDY1MjEyMTU3M30.LmG0Yps1XZyQdFQZg_HeTlm1OcJzZNJSmTI1rmktSVg`,
				},
			},
		).then(res => res.json());

		if (serverError) {
			console.log({ serverError });
			return;
		}

		console.log('Client secret returned ✔', clientSecret);

		//? Confirm the payment on the client
		const { error, paymentIntent } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: paymentMethod.id,
			},
		);

		if (error) {
			// Show error to customer (e.g., insufficient funds)
			console.log({ error: error.message });
			return;
		}

		// Show a success message to your customer
		console.log(`Payment ${paymentIntent.id}: ${paymentIntent.status}`);
	};

	return (
		<>
			<h1>Payment</h1>
			<form onSubmit={handleSubmit} id="payment-form">
				<label htmlFor="card-element">Card</label>
				<CardElement id="card-element" />

				<button type="submit">Charge Wallet 💲</button>
			</form>
		</>
	);
};

export default PaymentForm;
