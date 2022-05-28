import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const usePaymentForm = onReload => {
	const stripe = useStripe();
	const elements = useElements();

	// get email and idToken
	const email = useSelector(store => store.AuthData.email);
	const idToken = useSelector(store => store.AuthData.idToken);

	// get PaymentIntentId to recover money
	const [PaymentIntentId, setPaymentIntentId] = useState('');
	const [Loading, setLoading] = useState(false);

	const handleSubmit = async (e, amount) => {
		setLoading(true);

		// We don't want to let default form submission happen here,
		// which would refresh the page.
		e.preventDefault();
		console.log(amount);
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
				email: email,
			},
		});

		if (stripeError || !paymentMethod) {
			console.log({ stripeError });
			toast.error(stripeError.message);
			return;
		}

		//? Create payment intent in the server
		const { success, message, data } = await fetch(
			`${process.env.REACT_APP_API_URL}/wallet/charge`,
			{
				method: 'POST',
				body: JSON.stringify({
					paymentMethodId: paymentMethod.id,
					amount: parseInt(amount),
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
			},
		).then(res => res.json());

		if (success === false) {
			console.log({ message });
			toast.error({ message });
			return;
		}

		if (success === true) {
			setPaymentIntentId(data.paymentIntentId);
			// onReload(Math.random());
			setLoading(false);
		}

		console.log('Charge wallet done successfully ✔✔✔, status is ' + message);

		toast.success('You wallet balance updated ✔✔');
	};

	return {
		handleSubmit,
		PaymentIntentId,
		Loading,
	};
};

export default usePaymentForm;
