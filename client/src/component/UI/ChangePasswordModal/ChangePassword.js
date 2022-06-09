import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendConfirmation } from "../../../Api/Auth";
import useHttp from "../../../CustomHooks/useHttp";
import useInput from '../../../CustomHooks/useInput';
import Input from "../Input/input";

import ModalUi from "../Modal/modal";

function ChangePassword({forget , show , onHide}) {
		// sendEmailConfirmation
		const { sendRequest :sendRequestForEmailConf, status : statusForEmailConf, data:dataForEmailConf, error :errorForEmailConf } = useHttp(sendConfirmation);

		const idToken = useSelector(store => store.AuthData.idToken);


		const validatePassword = value => value.trim().length > 4;

		// const [ShowModal, setShowModal] = useState(show ? show : false);
		const [ModalTitle, setModalTitle] = useState('Are You Sure You Want To Change Password ? ');
		const [ModalBtn, setModalBtn] = useState('Confirm');
		const [ModalBody, setModalBody] = useState('');


		// start sendConfirmation Api


		const codeNum1ref = useRef();
		const codeNum2ref = useRef();
		const codeNum3ref = useRef();
		const codeNum4ref = useRef();
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
					placeholder="Old Password"
					validateText={validatePassword}
					ref={oldPasswordRef}
					errorMassage="please enter valid password"
					id = "oldPassword"
				/>
				<Input
					type="password"
					placeholder="New Password"
					validateText={validatePassword}
					ref={newPasswordRef}
					errorMassage="please enter valid password"
					id = "newPassword"
				/>

			</div>
		)

		const ChangePasswordHandler = () => {
			if(ModalBtn === 'Confirm'){
				setModalTitle('')
				setModalBody(
					<div>
						<h4 className='text-light fw-bold text-center pb-3 pt-0 mt-0'> Please Enter your Email Here </h4>
						<div className='col-9 m-auto mb-3'>
							<Input
								type="email"
								placeholder="Email"
								ref={EmailRef_inFtPass}
								id = "userEmail"
							/>
						</div>

					</div>

				)
				// if (EmailRef_inFtPass){
				// 	setModalBtn('Confirm Email')
				// }
				// else{
				// 	toast.error('Please Enter Valid To Change Your Password ')

				// }

			}

			else if(ModalBtn === 'Confirm Email'){
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
			else if(ModalBtn === 'Submit'){
				if(codeNum1ref.current.value && codeNum2ref.current.value && codeNum3ref.current.value && codeNum4ref.current.value){

					// start if code number is valid
					toast.success('Success ')
					setModalBody(PasswordsInput)
					setModalBtn('Change Password')
				}
				else{
					toast.error('Please Enter Code Number To Change Your Password ')
					setModalBtn('Confirm')
					onHide()
				}
			}
			if(ModalBtn === 'Change Password'){

			}

		}


	return (
		<React.Fragment>
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