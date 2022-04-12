import React, { useRef, useState } from "react";
import RadioButton from "../UI/RadioButtons/RadioButton";

import classes from './Steps.module.css'
import styles from '../UI/Prev&NxtButtons/Buttons.module.css';
import { AuthActions } from "../../../store/slices/RegisterSlices/isAuth";
import { useDispatch } from "react-redux";


const  Step4 = () => {
	let ResendValue  ;
	const [Value , setValue] = useState('')

	const codeNum1ref = useRef()
	const codeNum2ref = useRef()
	const codeNum3ref = useRef()
	const codeNum4ref = useRef()
	const codeNum5ref = useRef()
	const codeNum6ref = useRef()


	const ContactDetails = [codeNum1ref,codeNum2ref ,codeNum3ref ,codeNum4ref, codeNum5ref ,codeNum6ref].map((item,index) => (
				<input
				key={index}
				type="number"
				className={classes.code}
				min="0"
				max="9"
				required
				ref={item}

				onChange = {(e)=> setValue(e.currentTarget.value)}
				/>
	))


	const dispatch = useDispatch()

	const getReSendValue = (value) => {
		console.log(value)
		ResendValue = value
	}


	const ResendHandeler = () => {
		dispatch(AuthActions.ResendVerficationCode({ResendBy : ResendValue }))
	}


	const SubmitHandeler = () => {
			const verifactionCode = codeNum1ref.current.value + codeNum2ref.current.value + codeNum3ref.current.value + codeNum4ref.current.value + codeNum5ref.current.value + codeNum6ref.current.value
			console.log(verifactionCode)

			dispatch(AuthActions.isAuthStep4({verifactionCode :verifactionCode }))

	}

	return (
		<div className="container text-center">
      <h3>Verification</h3>
      <p className={classes['stepParagraph']}>We’ve just sent a text message with a fresh verification code to the
        phone number ***1023.
      </p>

			<div className={classes['code-container']}>
				{ContactDetails}

			</div>


			<p className= {` ${classes['notification']}  fw-bolder pt-3`}>
				Would you like to Resend Again ?
			</p>


			<RadioButton name="VerifyAccountBy" values={["Yes" , "No"]} getValue= {getReSendValue}  />

			<div className={styles['btn-steps']}>
        <button type="button" onClick = {ResendHandeler} className="btn btn-primary ">Re-Send</button>
        <button type="button" onClick = {SubmitHandeler} className="btn btn-secondary mx-2">Submit</button>
      </div>

		</div>
	 );
}

export default Step4;