import React, { useState , useEffect } from 'react';
import Modal_ from '../../../UI/Modal/modal';

import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp'

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm/index';
import { getWalletBalance } from '../../../../Api/BuyerApi';


const Wallet = (props) => {

	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
	const [chargeWallet , setChargeWallet] = useState(false)
	const [ModalName , setModalName] = useState('Wallet')
	const [btnFooterStyle , setBtnFooterStyle] = useState('')

	const idToken = useSelector(store=>store.AuthData.idToken)
	const {sendRequest , status , data} = useHttp(getWalletBalance);


	const chargeWalletHandler = () => {
		setChargeWallet(true)
		setModalName('Charge Wallet')
		setBtnFooterStyle('justify-content-start mx-2')
	}

	// get wallet balance
	useEffect(()=>{
		sendRequest(idToken)
	},[sendRequest])



	const PaymentContent =
	<>
		{!chargeWallet && <div className='d-flex space-around w-100'>
			<h4 className='fw-bold pt-2 px-4 '> Your Balance </h4>
			<h4 className='px-1 pt-2 fw-bolder align-items-end text-end w-50 text-danger'> {status==='completed'  && data && data.balance} </h4>
			</div>
		}
		{chargeWallet &&
			<Elements stripe={stripePromise}>
				<PaymentForm />
			</Elements>
		}
	</>

	return (
		<>
			<Modal_
				show={props.show}
				onHide={props.onHide}
				title= {ModalName}
				body = {PaymentContent}
				btnName = {!chargeWallet && "Charge Wallet"}
				btnHandler = {!chargeWallet && chargeWalletHandler}
				btnFooterStyle =  {btnFooterStyle}
			/>
		</>
	);
}

export default Wallet;