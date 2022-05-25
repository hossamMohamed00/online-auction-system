import React, { useState , useEffect } from 'react';
import Modal_ from '../../../UI/Modal/modal';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm/index';


const Wallet = (props) => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
	const [chargeWallet , setChargeWallet] = useState(false)
	const [ModalName , setModalName] = useState('Wallet')
	const [btnFooterStyle , setBtnFooterStyle] = useState('')


	const chargeWalletHandler = () => {
		setChargeWallet(true)
		setModalName('Charge Wallet')
		setBtnFooterStyle('justify-content-start mx-2')
	}

	const PaymentContent =
	<>
		{!chargeWallet && <div className='d-flex  flex-column'>
			<h4 className='fw-bold pt-2'> Your Balance </h4>
			<p className='px-1 text-secondary fw-bold	'> $ 50000 </p>
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