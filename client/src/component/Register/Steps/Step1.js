import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RegisterActions } from '../../../store/slices/RegisterSlices/Register';
import { AuthActions } from '../../../store/slices/RegisterSlices/userDetails';

import useHttp from '../../../CustomHooks/useHttp';
import { Register } from '../../../Api/Auth';

import RadioButton from '../UI/RadioButtons/RadioButton';
import Input from '../../UI/Input/input';
import classes from './Steps.module.css';
import { AuthDataActions } from '../../../store/slices/RegisterSlices/AuthData';

const Step1 = props => {
	const { sendRequest, status, data, error } = useHttp(Register);
	const [isValidForm, setIsValidForm] = useState(true);

	const userDetails = useSelector(store => store.userDetails.step1Details);
	const dispatch = useDispatch();

	/************  start Validation  ************** */

	// to check [password] with [check password]
	let password = '';
	let roleValue = '';
	let errorNameMessage = 'Please Enter Your Name';
	let errorEmailMessage = 'Please Enter Your Email';

	const nameRef = useRef();
	const passwordRef = useRef();
	const emailRef = useRef();
	const confirmPasswordRef = useRef();

	const validateText = value => value.trim() !== '';
	const validateEmail = value => value.trim().includes('@');
	const validatePassword = value => value.trim().length > 4;
	const validateConfirm = value => value.trim() === password;

	const getPasswordValue = value => {
		password = value;
	};
	const getRoleValue = value => {
		roleValue = value;
	};
	/************  end Validation  ************** */

	useEffect(() => {
		if (status === 'completed') {
			dispatch(
				AuthActions.setStep1Details({
					name: nameRef.current.value,
					email: emailRef.current.value,
					password: passwordRef.current.value,
					role: roleValue,
				}),
			);
			dispatch(
				AuthDataActions.login({
					idToken: data.accessToken,
					email: emailRef.current.value,
					role: data.role,
				}),
			);
			dispatch(RegisterActions.showStep2());
		}
	}, [status]);

	const ValidateForm = () => {
		if (
			validateText(nameRef.current.value) &&
			validateEmail(emailRef.current.value) &&
			validatePassword(passwordRef.current.value) &&
			validateConfirm(confirmPasswordRef.current.value)
		) {
			const userDetails = {
				name: nameRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
				role: roleValue,
			};
			sendRequest(userDetails);
		} else {
			setIsValidForm(false);
		}
	};

	const submitHandler = e => {
		e.preventDefault();
		console.log(roleValue);
		ValidateForm();
	};

	return (
		<div className={`container ${classes.Steps} `}>
			<h3> Personal Information</h3>

			<Input
				type="text"
				placeholder={userDetails.name ? userDetails.name : 'Name'}
				name="text"
				validateText={validateText}
				ref={nameRef}
				errorMassage={errorNameMessage}
			/>
			<Input
				type="email"
				placeholder={userDetails.email ? userDetails.email : 'Email'}
				name="email"
				validateText={validateEmail}
				ref={emailRef}
				errorMassage={errorEmailMessage}
			/>
			<Input
				type="password"
				placeholder="Password"
				name="password"
				validateText={validatePassword}
				ref={passwordRef}
				errorMassage="Your password must be more than 8 characters "
				getValue={getPasswordValue}
			/>
			<Input
				type="password"
				placeholder="Confirm Password"
				name="confirmPassword"
				validateText={validateConfirm}
				ref={confirmPasswordRef}
				errorMassage="Your confirm password must match with password "
			/>

			<div>
				<p className="text-light m-1 fs-6 fw-bolder"> Choose Your Role </p>
				<RadioButton
					name="role"
					values={['seller', 'buyer']}
					getValue={getRoleValue}
					changeValue={userDetails.role ? userDetails.role : ''}
				/>
			</div>

			{!isValidForm && (
				<p className={`${classes['alert']} p-2 text-center fs-6 `}>
					{' '}
					Please Enter the Required Information{' '}
				</p>
			)}
			{error && (
				<p className={`${classes['alert']} p-2 text-center fs-6 `}> {error} </p>
			)}

			<button
				onClick={submitHandler}
				className={`${classes['btn-next']} btn w-75 `}
				type="button"
			>
				{' '}
				Next{' '}
			</button>
		</div>
	);
};

export default Step1;
