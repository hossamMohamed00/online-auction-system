import React, { useEffect } from 'react';

// import useHttp from "../../../CustomHooks/useHttp";
// import { sendConfiramtion } from "../../../Api/Auth";
import { useDispatch, useSelector } from 'react-redux';

import Buttons from '../UI/Prev&NxtButtons/Buttons';
import RadioButton from '../UI/RadioButtons/RadioButton';

import classes from './Steps.module.css';
import { RegisterActions } from '../../../store/slices/RegisterSlices/Register';
import { resendConfirmation, sendConfirmation } from '../../../Api/Auth';
import useHttp from '../../../CustomHooks/useHttp';
import { toast, ToastContainer } from 'react-toastify';

const Step3 = () => {
	const {sendRequest , status , data , error } = useHttp(sendConfirmation);
	const {sendRequest:reSendConfirmationRequest , status:reSendConfirmationStatus  , error:reSendConfirmationError } = useHttp(resendConfirmation);

	const dispatch = useDispatch();

	let isAcceptant;

	const email = useSelector(store => store.userDetails.step1Details.email);
	const phoneNumber = useSelector(
		store => store.userDetails.step2Details.phoneNum,
	);
	const idToken = useSelector(store => store.AuthData.idToken);

	const Details = { Email: email, PhoneNumber: phoneNumber };

	const ContactDetails = Object.keys(Details).map(item => (
		<div className="row bg-light my-3 rounded-2 " key={item}>
			<div
				className="col-lg-4 p-1 rounded-start "
				style={{ backgroundColor: '#2666CF' }}
			>
				<p className={`${classes.contactDetails} text-center text-light`}>
					{' '}
					{item}{' '}
				</p>
			</div>

			<div className="col-lg">
				<p className={`${classes.contactDetails}  `}> {Details[item]} </p>
			</div>
		</div>
	));

	const getAcceptantValue = value => {
		isAcceptant = value;
	};

	const SubmitHandler = () => {
		if (isAcceptant) {
			sendRequest(idToken)
		}else{
			dispatch(RegisterActions.showStep4())
		}
	};
	useEffect(()=>{
		if(status==='completed'){
			dispatch(RegisterActions.showStep4())
		}
		else if(status === 'error'){
			toast.error(error)
		}
	},[status])


	return (
		<div className={`container ${classes.Steps} text-center`}>
			<ToastContainer theme='dark' />
			<h3>Contact Details</h3>
			<p className={classes['stepParagraph']}>
				We’ll send auction update and notifications to your email
			</p>

			{ContactDetails}

			<p className={` ${classes['notification']} fw-bolder pt-3`}>
				Would you like to verify this account?
			</p>

			<RadioButton
				name="UsePhoneNum"
				values={['Yes', 'No']}
				getValue={getAcceptantValue}
			/>

			{/* {error && <p className={`${classes['alert']} p-2 text-center fs-6 `} > {error} </p> } */}

			<Buttons nxt="Step4" onClick={SubmitHandler} />
		</div>
	);
};

export default Step3;
