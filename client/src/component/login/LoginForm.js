import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AuthDataActions } from '../../store/slices/RegisterSlices/AuthData';
import { Login } from '../../Api/Auth';
import useHttp from '../../CustomHooks/useHttp';

import Input from '../UI/Input/input';
import Card from '../UI/Card/Card';
import classes from './loginForm.module.css';

//images
import facebookImg from '../../assets/facebook.png';
import googleImg from '../../assets/google-logo-9808.png';
import twitterImg from '../../assets/twitter.png';
import { toast, ToastContainer } from 'react-toastify';
import ModalUi from '../UI/Modal/modal';
import useInput from '../../CustomHooks/useInput';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { sendRequest, status, data, error } = useHttp(Login);
	const idToken = useSelector(store => store.AuthData.idToken);

	const nameRef = useRef();
	const passwordRef = useRef();

	const validateEmail = value => value.trim().includes('@');
	const validatePassword = value => value.trim().length > 4;

	const [ShowModal, setShowModal] = useState(false);
	const [ModalTitle, setModalTitle] = useState('Are You Sure You Want To Change Password ? ');
	const [ModalBtn, setModalBtn] = useState('Confirm');
	const [ModalBody, setModalBody] = useState('');




	useEffect(() => {
		if (status === 'completed') {
			const email = nameRef.current.value;
			dispatch(
				AuthDataActions.login({
					idToken: data.accessToken,
					role: data.role,
					email: email,
				}),
			);
			toast.success('Login Successfully ❤️‍🔥 ');
			const timer = setTimeout(() => {
				if (data.role === 'buyer') {
					navigate('/home-page');
				} else if (data.role === 'admin') {
					navigate('/adminDashboard');
				} else if (data && data.role === 'seller') {
					navigate('/seller-dashboard');
				}
				if (data && data.role === 'employee') {
					navigate('/employeeDashboard');
				}
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [status]);

	const submitHandler = e => {
		e.preventDefault();
		const userDetails = {
			email: nameRef.current.value,
			password: passwordRef.current.value,
			idToken,
		};
		sendRequest(userDetails);
	};

	useEffect(() => {
		if (status === 'error') {
			toast.error(error);
		}
	}, [status]);


	const codeNum1ref = useRef();
	const codeNum2ref = useRef();
	const codeNum3ref = useRef();
	const codeNum4ref = useRef();

	// change Password Refs
	const newPasswordRef = useRef()
	const oldPasswordRef = useRef()


	const { hasError, onChangeValueHandeler, onBlurHandeler } = useInput(
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
			className={`${classes.code} ${hasError ? 'bg-danger' : ''}`}
			min="0"
			max="9"
			required
			ref={item}
			onChange={onChangeValueHandeler}
			onBlur={onBlurHandeler}
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
			setModalTitle('Change Password')
			setModalBody(
				<div>
					<h6 className='text-light fw-bold text-center'> Please Enter Code that send to your email Here </h6>
					<div className={classes.codeContainer}>
						{VerificationNum}
					</div>
				</div>

			)
			setModalBtn('Submit')

		}
		if(ModalBtn === 'Submit'){
			if(codeNum1ref.current.value && codeNum2ref.current.value && codeNum3ref.current.value && codeNum4ref.current.value){


				// start if code number is valid
				toast.success('Success ')
				setModalBody(PasswordsInput)
				setModalBtn('Change Password')
			}
			else{
				toast.error('Please Enter Code Number To Change Your Password ')
				setModalBtn('Confirm')
				setShowModal(false)
			}
		}
		if(ModalBtn === 'Change Password'){

		}

	}

	return (
		<div className={classes['form-container']}>
			<ToastContainer theme="dark" />
			<Card className={'loginCard'}>
				<form onSubmit={submitHandler}>
					<Input
						type="email"
						placeholder="Email"
						validateText={validateEmail}
						ref={nameRef}
						errorMassage="please enter your email"
						id = "email"

					/>
					<Input
						type="password"
						placeholder="Password"
						validateText={validatePassword}
						ref={passwordRef}
						errorMassage="please enter valid password"
						id = "password"
					/>
					<div className={classes.text}>
						<p className="text-primary text-end float-right w-100" onClick={()=>setShowModal(true)}> Forget password ?</p>
					</div>

					<button className="btn btn-primary" onSubmit={submitHandler}>
						Login
					</button>
				</form>
				<div className={classes.accounts}>
					<img src={facebookImg} alt="facebookImg" />
					<img src={twitterImg} alt="twitterImg" />
					<img src={googleImg} alt="googleImg" />
				</div>
			</Card>


			{ShowModal && (
				<ModalUi
					show={ShowModal}
					onHide={() => setShowModal(false)}
					title= {ModalTitle}
					body = {ModalBody}
					btnName={ModalBtn}
					btnHandler={ChangePasswordHandler}

				/>
			)}
		</div>

	);
};

export default LoginForm;
