import React, { useState , useEffect } from 'react';
import Modal_ from '../../../UI/Modal/modal';


const Wallet = (props) => {

	const PaymentContent =
		<div className='d-flex  flex-column'>
			<h4 className='fw-bold pt-2'> Your Balance </h4>
			<p className='px-1 text-secondary fw-bold	'> $ 50000 </p>
		</div>

	return (
		<>
			<Modal_
				show={props.show}
				onHide={props.onHide}
				title='Wallet '
				body = {PaymentContent}
				btnName = "Charge Wallet"
				linkPath = '/'
			/>
		</>
	);
}

export default Wallet;