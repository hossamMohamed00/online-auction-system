import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../../../store/slices/RegisterSlices/userDetails';
import Buttons from '../UI/Prev&NxtButtons/Buttons';
import classes from './Steps.module.css';

const Step2 = () => {
	let phoneNum = useSelector(store => store.userDetails.step2Details.phoneNum);

	const phoneNumRef = useRef();

	const dispatch = useDispatch();

	const submitStep2Handler = () => {
			dispatch(AuthActions.setStep2Details({ phoneNum: phoneNumRef.current.value }))
	};

	return (
		<div className={`container ${classes.Steps} `}>
			<h3> Account Setup</h3>
			<p className={classes['stepParagraph']}>
				This Step to ensure you're a real person by adding a phone number
			</p>

			<div className="input-group my-4">
				<button
					className={` ${classes.btnPhoneNum} btn`}
					type="button"
					id="phoneNum"
				>
					20
				</button>
				<input
					type="text"
					className="form-control"
					placeholder={phoneNum ? phoneNum : ''}
					ref={phoneNumRef}
				/>
			</div>

			<Buttons prev="Step1" nxt="Step3" onClick={submitStep2Handler} />
		</div>
	);
};

export default Step2;
