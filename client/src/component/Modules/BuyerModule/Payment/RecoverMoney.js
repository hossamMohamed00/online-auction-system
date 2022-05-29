import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../../../UI/Loading/LoadingSpinner';
import Modal_ from '../../../UI/Modal/modal';

const RecoverMoney = props => {
	const [ModalTitle, setModalTitle] = useState(
		'Are You Sure You Want To Recover Your Money',
	);
	const [btnName, setBtnName] = useState('Recover Money');

	const idToken = useSelector(store => store.AuthData.idToken);

	const [loading, setLoading] = useState(false);

	const RecoverMoneyHandler = async () => {
		setLoading(true);
		const paymentIntentId = props.PaymentIntentId;

		const { success, message } = await fetch(
			`${process.env.REACT_APP_API_URL}/wallet/refund?paymentIntentId=${paymentIntentId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
			},
		).then(res => res.json());

		if (success === true) {
<<<<<<< HEAD
			setLoading(false);
			setModalTitle(message);
			props.onReload(Math.random());
			props.onHide()

=======
			props.onReload(Math.random());
			setModalTitle(message);
			setBtnName('');
			setLoading(false);
>>>>>>> main
		} else {
			setLoading(false);
			setModalTitle(message);
			setBtnName('');
			return;
		}
	};

	return (
		<>
			{loading && <LoadingSpinner />}
			<Modal_
				show={props.show}
				onHide={props.onHide}
				title={ModalTitle}
				btnName={btnName}
				btnHandler={RecoverMoneyHandler}
<<<<<<< HEAD
				onReload = {props.onReload}
=======
>>>>>>> main
			/>
		</>
	);
};

export default RecoverMoney;
