import React, { useRef, useState } from 'react';
import { CardElement} from '@stripe/react-stripe-js';
import usePaymentForm from './usePaymentForm.js';

import { ToastContainer, toast } from 'react-toastify';
import Input from '../../../../UI/Input/input'

import './PaymentForm.css'
import Modal_ from '../../../../UI/Modal/modal.js';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../../UI/Loading/LoadingSpinner.js';


const PaymentForm = (props) => {
	// Get the handle submit method
	const AmountRef = useRef()
	const [AmountErrorMessage , setAmountErrorMessage] = useState('please enter Amount To charge your wallet ❌')
	const { handleSubmit , PaymentIntentId , Loading} = usePaymentForm(props.onReload);

	const [showModal , setShowModal] = useState(false)

	// start validate Amount num [Amount must be less than 100]
	const validateAmout = value => value.trim().length !== 0 && value > 100

	const handleSubmitValidation = (e) => {
		e.preventDefault();
		if(validateAmout(AmountRef.current.value)){
			handleSubmit(e , AmountRef.current.value)
			setShowModal(true)
		}
		else {
			setAmountErrorMessage('Amount must\'nt be less than 100 ❌')
			toast.error('Please Fill All Details Required For Charge Your Wallet ❌ ')
			setShowModal(true)
		}
	}
	//* Return the form that responsible for payment
	return (
		<>
			<ToastContainer/>
			{Loading && <LoadingSpinner/> }
			<form onSubmit={handleSubmitValidation} id="payment-form" className={props.className ? props.className :''}>
				{/* start cardElement */}
				<label htmlFor="card-element" className='fw-bold fs-5 text-light' >Card Details</label>
				<CardElement id="card-element" className='form-control my-2 mb-0 paymentInput'/>
				{/* end cardElement */}

				{/* start amount */}
				<label className='text-light fs-5 mt-4 mb-2 fw-bold'> Amount </label>
				<Input
					type="number"
					validateText={validateAmout}
					errorMassage={AmountErrorMessage}
					id="prudectPrice"
					className="chargeAmountStyle "
					ref={AmountRef}
				/>
				{/* end amount */}

				{/* Charge Wallet Now 💲 */}
				<button type="submit" className={`btn paymentBtn btn-success  ${props.className ? 'col-md-5 col-sm-12 chargeWalletBtn bg-primary' : 'float-left btn-success'} `}> Charge Wallet Now  </button>
				{props.showAllBtns && <Link  className={`btn paymentBtn  ${props.className ? 'col-md-5 col-sm-12 recoverMoneyBtn btn-danger' : 'float-left btn-success'} `} to={`/buyer-dashboard/recoverMoney?paymentIntentId=${PaymentIntentId}`}> Recover Your Money </Link>
				}

			</form>

			{/* show success modal when charge wallet is done successfully */}
			{/* {showModal && props.showModal && <Modal_
				show={showModal}
				onHide={()=> setShowModal(false)}
				title= {<h2> Charge Wallet Successfully </h2>}
				btnName = ""
			/>} */}
		</>
	);
};

export default PaymentForm;
