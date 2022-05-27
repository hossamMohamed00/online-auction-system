import React, { useRef, useState } from 'react';
import { CardElement} from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../../../UI/Input/input'

import './PaymentForm.css'


const PaymentForm = () => {
	// Get the handle submit method
	const AmountRef = useRef()
	const [AmountErrorMessage , setAmountErrorMessage] = useState('please enter Amount To charge your wallet ❌')
	const { handleSubmit } = usePaymentForm();

	// start validate Amount num [Amount must be less than 100]
	const validateAmout = value => value.trim().length !== 0 && value > 100

	const handleSubmitValidation = (e) => {
		e.preventDefault();
		if(validateAmout(AmountRef.current.value)){
			handleSubmit(e , AmountRef.current.value)
		}
		else {
			setAmountErrorMessage('Please Fill All Details Required For Charge Your Wallet ❌')
			toast.error('Please Fill All Details Required For Charge Your Wallet ❌ ')
		}
	}
	//* Return the form that responsible for payment
	return (
		<>
			<ToastContainer/>
			<form onSubmit={handleSubmitValidation} id="payment-form">
				<label htmlFor="card-element" className='fw-bold fs-5' >Card Details</label>
				<CardElement id="card-element" className='form-control my-3 mb-0 paymentInput'/>
				<label className='text-light fs-5 my-3 fw-bold'> Amount </label>
				<Input
					type="number"
					validateText={validateAmout}
					errorMassage={AmountErrorMessage}
					id="prudectPrice"
					className="chargeAmountStyle"
					ref={AmountRef}
				/>
				{/* Charge Wallet Now 💲 */}
				<button type="submit" className='btn btn-success paymentBtn '> Charge Wallet Now  </button>
			</form>
		</>
	);
};

export default PaymentForm;
