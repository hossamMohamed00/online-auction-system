import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmChangePasswordCode, ResetPassword, sendConfirmation } from "../../../Api/Auth";
import useHttp from "../../../CustomHooks/useHttp";
import useInput from '../../../CustomHooks/useInput';
import Input from "../Input/input";
import LoadingSpinner from '../Loading/LoadingSpinner'

import ModalUi from "../Modal/modal";

function ChangePassword({forget , show , onHide}) {
		// sendEmailConfirmation

		const { sendRequest :sendRequestForEmailConf, status : statusForEmailConf, data:dataForEmailConf, error :errorForEmailConf } = useHttp(ResetPassword);
		const { sendRequest :sendRequestForConfCode, status : statusForForConfCode, data:dataForConfCode, error :errorForConfCode } = useHttp(confirmChangePasswordCode);

		// const idToken = useSelector(store => store.AuthData.idToken);

		const validatePassword = value => value.trim().length > 4;

		const [ModalTitle, setModalTitle] = useState('Are You Sure You Want To Change Password ? ');
		const [ModalBtn, setModalBtn] = useState('Confirm');
		const [ModalBody, setModalBody] = useState('');

		const [loading, setLoading] = useState(false);


		// start sendConfirmation Api
		useEffect(()=>{
			if(statusForEmailConf === 'completed' ){
				setLoading(false)
				toast.success('Rest Your Password is Done Successfully ❤️‍🔥 ');
				setModalBody(
					<div>
						<h6 className='text-light fw-bold text-center'> Please Enter Code that send to your email Here </h6>
						<div className='codeContainer'>
							{VerificationNum}
						</div>
					</div>

				)
				setModalBtn('Submit')
			}
			if(statusForEmailConf==='error'){
				setLoading(false)
				console.log(errorForEmailConf)
				toast.error(errorForEmailConf)

			}
		} , [statusForEmailConf])


		// start sendConfirmation Api
		useEffect(()=>{
			if(statusForForConfCode === 'completed' ){
				setLoading(false)
				toast.success('Successfully ❤️‍🔥 ');
				toast.success(dataForConfCode.message);

				setModalBody(PasswordsInput)
				setModalBtn('Change Password')
			}
			if(statusForForConfCode ==='error'){
				setLoading(false)
				toast.error(errorForConfCode)
			}
		} , [statusForForConfCode])

		const codeNum1ref = useRef();
		const codeNum2ref = useRef();
		const codeNum3ref = useRef();
		const codeNum4ref = useRef();
		const codeNum5ref = useRef();

		const EmailRef_inFtPass = useRef()
		// change Password Refs
		const newPasswordRef = useRef()
		const oldPasswordRef = useRef()


		const { hasError, onChangeValueHandler, onBlurHandler } = useInput(
			value => value.trim().length === 1,
		);

		const VerificationNum = [
			codeNum1ref,
			codeNum2ref,
			codeNum3ref,
			codeNum4ref,
		].map((item, index) => (
			<input
				key={index}
				type="number"
				className={`code ${hasError ? 'bg-danger' : ''}`}
				min="0"
				max="9"
				required
				ref={item}
				onChange={onChangeValueHandler}
				onBlur={onBlurHandler}
			/>
		));

		const PasswordsInput = (
			<div>
				<h6 className='text-light fw-bold text-center pb-2'> Please Enter Old And New Password </h6>
				<Input
					type="password"
					placeholder="Password"
					validateText={validatePassword}
					ref={oldPasswordRef}
					errorMassage="please enter valid password"
					id = "oldPassword"
				/>
				<Input
					type="password"
					placeholder="Confirm Password"
					validateText={validatePassword}
					ref={newPasswordRef}
					errorMassage="please enter valid password"
					id = "newPassword"
				/>

			</div>
		)

		const ChangePasswordHandler = () => {
			// confirm that you want to change password
			if(ModalBtn === 'Confirm'){
				setModalTitle('')
				setModalBody(
					<div>
						<h4 className='text-light fw-bold text-center pb-3 pt-0 mt-0'> Please Enter your Email Here </h4>
						<div className='col-9 m-auto mb-3'>
							<Input
								type="email"
								placeholder="Email"
								id = "userEmail"
								ref = {EmailRef_inFtPass}
							/>
						</div>
					</div>
				)
				setModalBtn('Confirm Email')
			}

			else if(ModalBtn === 'Confirm Email'){
				console.log(EmailRef_inFtPass.current.value)
				if(EmailRef_inFtPass.current.value){
					const email = EmailRef_inFtPass.current.value
					sendRequestForEmailConf({email})
					setLoading(true)
				}
			}
			else if(ModalBtn === 'Submit'){
				if(codeNum1ref.current.value && codeNum2ref.current.value && codeNum3ref.current.value && codeNum4ref.current.value + codeNum5ref.current.value){
					const email = EmailRef_inFtPass.current.value
					const verificationCode = codeNum1ref.current.value + codeNum2ref.current.value + codeNum3ref.current.value + codeNum4ref.current.value + codeNum5ref.current.value
					sendRequestForConfCode({verificationCode , email})
				}
			}
			if(ModalBtn === 'Change Password'){

			}

		}


	return (
		<React.Fragment>
			{loading && <LoadingSpinner /> }
			{show && (
				<ModalUi
					show={show}
					onHide={onHide}
					title= {ModalTitle}
					body = {ModalBody}
					btnName={ModalBtn}
					btnHandler={ChangePasswordHandler}
					hideBorder = {true}
				/>
			)}
		</React.Fragment>

	);
}

export default ChangePassword;