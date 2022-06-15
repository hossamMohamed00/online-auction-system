import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { Register, RequestOtp } from '../../../Api/Auth';
import useHttp from '../../../CustomHooks/useHttp';
import { AuthDataActions } from '../../../store/slices/RegisterSlices/AuthData';
import { RegisterActions } from '../../../store/slices/RegisterSlices/Register';
import userDetails, { AuthActions } from '../../../store/slices/RegisterSlices/userDetails';
import Buttons from '../UI/Prev&NxtButtons/Buttons';
import RadioButton from '../UI/RadioButtons/RadioButton'
import Step4 from './Step4';
import classes from './Steps.module.css';
import VerificationCode from './VerificationCode';


const Step2 = (props) => {
	const phoneNum = useSelector(store => store.userDetails.step2Details.phoneNum);
	const userDetail = useSelector(store => store.userDetails.step1Details)
	const [ShowVerificationCode , setIsShownVerificationCode] =  useState(false)
	// start confirm otp
	const {sendRequest:sendRequestForConfirmPhone  , status:statusForConfirmPhone , data:dataForConfirmPhone , error : errorForConfirmPhone} = useHttp(RequestOtp)
	const {sendRequest:sendRequestForRegister  , status:statusForRegister , data:dataForRegister , error : errorForRegister} = useHttp(Register)

	const [ShowStep4 , setShowStep4] = useState(false)
	let isAcceptant;
	const phoneNumRef = useRef();

	const getAcceptantValue = value => {
		isAcceptant = value;
	};

	const dispatch = useDispatch();

	const submitStep2Handler = () =>{
		dispatch(AuthActions.setStep2Details({ phoneNum: `+2${phoneNumRef.current.value}` }))

		const userDetails = {
			name: userDetail.name,
			email: userDetail.email,
			password: userDetail.password,
			role: userDetail.role,
			nationalID: userDetail.nationalID,
			phoneNumber: `+2${phoneNumRef.current.value}`,
		};
		sendRequestForRegister(userDetails);
		// dispatch(RegisterActions.showStep4())
		setShowStep4(true)

	};

	// start request otp status
	useEffect(()=>{
		if(statusForRegister === 'completed'){
			toast.success('Register Successfully ❤️‍🔥')

			dispatch(
				AuthDataActions.login({
					idToken: dataForRegister.accessToken,
					email :userDetail.email,
					role: userDetail.role,
				}),
			);
			// dispatch(RegisterActions.showStep4())

			if (isAcceptant === 'Yes') {
				sendRequestForConfirmPhone(dataForRegister.accessToken)
			}
			else{
				dispatch(RegisterActions.showStep4())
			}
		}
		else if(statusForRegister ==='error'){
			toast.error(errorForRegister)
			const timer = setTimeout(()=>{
				props.hasError(errorForRegister)
				dispatch(RegisterActions.showStep1())
			},2000)
			return () => clearTimeout(timer)
		}
	}, [statusForRegister])


	useEffect(()=>{
		if(statusForConfirmPhone === 'completed'){
			setIsShownVerificationCode(true)
		}
		else if(statusForConfirmPhone === 'error'){
			toast.error(errorForConfirmPhone)
			setIsShownVerificationCode(false)
		}
	}, [statusForConfirmPhone])

	return (
		<React.Fragment>
			<ToastContainer theme="dark" />
		{!ShowVerificationCode ?
			(
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

				{/* start Phone Confirmation */}
				<p className={` ${classes['notification']} `}>
					Use this phone number for Bidding?
				</p>

				<RadioButton
					name="UsePhoneNum"
					values={['Yes', 'No']}
					getValue={getAcceptantValue}
					changeValue={phoneNum ? 'Yes' : 'No'}
				/>
				<Buttons nxt= "Send" onClick={submitStep2Handler} />
			</div>
			)
			: (
				<VerificationCode/>
			)
		}
		{/* {ShowStep4 && <Step4/>} */}
	</React.Fragment>

	);
};

export default Step2;
