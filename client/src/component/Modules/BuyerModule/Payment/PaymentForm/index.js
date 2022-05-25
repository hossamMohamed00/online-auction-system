import React from 'react';
import { CardElement} from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

import './PaymentForm.css'


const PaymentForm = () => {
	// Get the handle submit method
	const { handleSubmit } = usePaymentForm();

	//* Return the form that responsible for payment
	return (
		<>
			<form onSubmit={handleSubmit} id="payment-form">
				<label htmlFor="card-element" className='fw-bold fs-5' >Card Details</label>
				<CardElement id="card-element" className='form-control my-3 mb-0 paymentInput'/>
				{/* Charge Wallet Now 💲 */}
				<button type="submit" className='btn btn-success paymentBtn '> Charge Wallet Now  </button>
			</form>
		</>
	);
};

export default PaymentForm;
