import React, {useRef, useState } from "react";
import Input from "../UI/Input/input";
import classes from './Steps.module.css'

import { useDispatch } from "react-redux";
import { RegisterActions } from "../../../store/slices/Register";
import { AuthActions } from "../../../store/slices/RegisterSlices/isAuth";
import RadioButton from "../UI/RadioButtons/RadioButton";

const Step1 = () => {
	// to check [password] with [checkpassword]
	let password = ''
	let roleValue = ''

	const nameRef = useRef()
	const passwordRef = useRef()
	const emailRef = useRef()
	const confirmPasswordRef = useRef()


	let errorNameMessage = "Please Enter Your Name";
	let errorEmailMessage = "Please Enter Your Email";

	/* Validation */
	const vaildteText = (value) => value.trim() !== ''
	const vaildteEmail = (value) => value.trim().includes('@')
	const validatePassword = (value) => value.trim().length > 4
	const validateConfirm = (value) => value.trim() === password

	const getPasswordValue = (value) => {
		password = value
	}
	const getRoleValue = (value) => {
		console.log(value)
		roleValue = value
	}

	const [isValidForm , setIsValidForm] = useState(true)

	const ValidateForm = () => {
		if (vaildteText(nameRef.current.value) &&  vaildteEmail(emailRef.current.value) && validatePassword(passwordRef.current.value) && validateConfirm(confirmPasswordRef.current.value)) {
			dispatch(RegisterActions.showStep2())
			dispatch(AuthActions.isAuthStep1({name:nameRef.current.value , email:emailRef.current.value , password:passwordRef.current.value}))
		}
		else{
			setIsValidForm(false)
		}

	}


	// change to step2
	const dispatch = useDispatch()


	const submitHadler = (e) => {
		e.preventDefault()
		console.log(roleValue)
		ValidateForm()
	}

	return (
		<div className= {`container ${classes.Steps} `}>
			<h3> Personal Information</h3>

			<Input type='text' placeholder='Name' name='text' validateText={vaildteText} ref={nameRef}  errorMassage= {errorNameMessage} />
			<Input type='email' placeholder='Email' name='email' validateText={vaildteEmail} ref={emailRef}  errorMassage ={errorEmailMessage} />
			<Input type='password' placeholder='Password' name='password' validateText={validatePassword} ref={passwordRef} errorMassage="Your password must be more than 8 characters " getValue={getPasswordValue}  />
			<Input type='password' placeholder='Confirm Password' name='confirmPassword' validateText={validateConfirm} ref={confirmPasswordRef} errorMassage="Your confirm password must mutch password "/>

			<div>
				<p className="text-light m-1 fs-6 fw-bolder"> Choose Your Role </p>
				<RadioButton name="role" values= {["Seller" ,"Buyer"]}  getValue= {getRoleValue} />

			</div>


			{!isValidForm && <p className={`${classes['alert']} p-2 text-center fs-6 `} > Please Enter the Required Information </p> }

			<button onClick={submitHadler} className={`${classes['btn-next']} btn w-75 `} type="button"  > Next   </button>
		</div>
	)

}

export default Step1;
