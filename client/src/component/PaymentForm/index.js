import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

const PaymentForm = () => {
	const { handleSubmit } = usePaymentForm();

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button>Charge Wallet 💲</button>
		</form>
	);
};

export default PaymentForm;
