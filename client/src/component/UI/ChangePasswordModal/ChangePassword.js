import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ChangeTONewPassword, confirmChangePasswordCode, ResetPassword } from "../../../Api/Auth";
import useHttp from "../../../CustomHooks/useHttp";
import useInput from '../../../CustomHooks/useInput';
import Input from "../Input/input";
import LoadingSpinner from '../Loading/LoadingSpinner'

import ModalUi from "../Modal/modal";
import './ChangePassword.css'


function ChangePassword({forget , show , onHide}) {
		// sendEmailConfirmation

		const { sendRequest :sendRequestForEmailConf, status : statusForEmailConf, data:dataForEmailConf, error :errorForEmailConf } = useHttp(ResetPassword);
		const { sendRequest :sendRequestForConfCode, status : statusForConfCode, data:dataForConfCode, error :errorForConfCode } = useHttp(confirmChangePasswordCode);
		const { sendRequest :sendRequestForChangeToNewPassword, status : statusForChangeToNewPassword, data:dataForChangeToNewPassword, error :errorForChangeToNewPassword } = useHttp(ChangeTONewPassword);


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
		} , [statusForEmailConf])


		// start sendConfirmation Api
		useEffect(()=>{
			if(statusForConfCode === 'completed' ){
				setLoading(false)
				toast.success('Successfully ❤️‍🔥 ');
				toast.success(dataForConfCode.message);

				setModalBody(PasswordsInput)
				setModalBtn('Change Password')
			}
			if(statusForConfCode ==='error'){
				setLoading(false)
				toast.error(errorForConfCode)
				onHide()
			}
		} , [statusForConfCode])


		// start change password Api
		useEffect(()=>{
			if(statusForChangeToNewPassword === 'completed' ){
				setLoading(false)
				toast.success(dataForChangeToNewPassword.message);

				setModalTitle('Change Password is Done Successfully ❤️‍🔥')
				setModalBody('')
				setModalBtn('')
			}
			if(statusForChangeToNewPassword ==='error'){
				setLoading(false)
				toast.error(errorForChangeToNewPassword)
				onHide()
			}
		} , [statusForChangeToNewPassword])

		const codeNum1ref = useRef();
		const codeNum2ref = useRef();
		const codeNum3ref = useRef();
		const codeNum4ref = useRef();
		const codeNum5ref = useRef();

		const EmailRef_inFtPass = useRef()
		// change Password Refs
		const newPasswordRef = useRef()


		const { hasError, onChangeValueHandler, onBlurHandler } = useInput(
			value => value.trim().length === 1,
		);

		const VerificationNum = [
			codeNum1ref,
			codeNum2ref,
			codeNum3ref,
			codeNum4ref,
			codeNum5ref

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
				<h6 className='text-light fw-bold text-center pb-2'> Please Enter New Password </h6>
				<Input
					type="password"
					placeholder="Password"
					validateText={validatePassword}
					ref={newPasswordRef}
					errorMassage="please enter valid password"
					id = "oldPassword"
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
				if(newPasswordRef.current.value){
					const email = EmailRef_inFtPass.current.value
					const password = newPasswordRef.current.value
					const verificationCode = codeNum1ref.current.value + codeNum2ref.current.value + codeNum3ref.current.value + codeNum4ref.current.value + codeNum5ref.current.value
					sendRequestForChangeToNewPassword({email , verificationCode, password})
				}
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