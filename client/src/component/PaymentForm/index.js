import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

const PaymentForm = () => {
	// Get the handle submit method
	const { handleSubmit } = usePaymentForm();

	//* Return the form that responsible for payment
	return (
		<>
			<h1>Charge Wallet</h1>
			<form onSubmit={handleSubmit} id="payment-form">
				<label htmlFor="card-element">Card Details</label>
				<CardElement id="card-element" />

				<button type="submit">Charge Wallet Now💲</button>
			</form>
		</>
	);
};

export default PaymentForm;
