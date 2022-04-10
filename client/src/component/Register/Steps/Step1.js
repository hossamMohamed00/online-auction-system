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

	const nameRef = useRef()
	const passwordRef = useRef()
	const emailRef = useRef()
	const confirmPasswordRef = useRef()

	const roleRef = useRef()


	/* Validation */
	const vaildteText = (value) => value.trim() !== ''
	const vaildteEmail = (value) => value.trim().includes('@')
	const validatePassword = (value) => value.trim().length > 2
	const validateConfirm = (value) => value.trim() === password

	const getPasswordValue = (value) => {
		password = value
	}

	const [isValidForm , setIsValidForm] = useState(true)

	const ValidateForm = () => {
		if (vaildteText(nameRef.current.value) &&  vaildteEmail(emailRef.current.value) && validatePassword(passwordRef.current.value) && validateConfirm(confirmPasswordRef.current.value)) {
			dispatch(RegisterActions.showStep2())
			dispatch(AuthActions.isAuthStep1({name:nameRef.current.value}))
		}
		else{
			setIsValidForm(false)
		}

	}



	// end Validation
	/* ****************************************** */

	// change to step2
	const dispatch = useDispatch()

	const submitHadler = (e) => {
		e.preventDefault()
		ValidateForm()
		console.log(roleRef)
	}
	return (
		<div className="constainer">
			<h3> Personal Information</h3>

			<Input type='text' placeholder='Name' name='text' validateText={vaildteText} ref={nameRef} />
			<Input type='email' placeholder='Email' name='email' validateText={vaildteEmail} ref={emailRef} />

			<Input type='password' placeholder='Password' name='password' validateText={validatePassword} ref={passwordRef} getValue={getPasswordValue} />
			<Input type='password' placeholder='Confirm Password' name='confirmPassword' validateText={validateConfirm} ref={confirmPasswordRef} />

			<RadioButton name="role" values= {["Seller" ,"Buyer"]} ref={roleRef} />

			{!isValidForm && <p className={`${classes['alert']} p-2 text-center fs-6 `} > Please Enter the Required Information </p> }

			<button onClick={submitHadler} className={`${classes['btn-next']} btn w-75 `} type="button"  > Next   </button>
		</div>

	)

}

export default Step1;
