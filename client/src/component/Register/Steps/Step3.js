import React, { useEffect } from "react";

import useHttp from "../../../CustomHooks/useHttp";
import {useDispatch, useSelector } from "react-redux";
import { sendConfiramtion } from "../../../Api/Auth";

import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";

import classes from './Steps.module.css'
import { RegisterActions } from "../../../store/slices/RegisterSlices/Register";


const  Step3 = () => {
	const {sendRequest , status , data , error } = useHttp(sendConfiramtion);
	// const {sendRequest:reSendConfiramtionRequest , status:reSendConfiramtionStatus  , error:reSendConfiramtionError } = useHttp(reSendConfiramtion);

	const dispatch = useDispatch();

	let isAcceptant

	const email 			= useSelector((store) => store.userDetails.step1Details.email)
	const phoneNumber = useSelector((store) => store.userDetails.step2Details.phoneNum)
	const idToken 		= useSelector((store) => store.AuthData.idToken)

	const Details = { "Email" : email , "PhoneNumber" : phoneNumber}

	const ContactDetails =
		Object.keys(Details).map(item => (
				<div className="row bg-light my-3 rounded-2 " key={item}>

					<div className="col-lg-4 p-1 rounded-start " style={{backgroundColor:"#2666CF"}}>
						<p className={`${classes.contactDetails} text-center text-light`}> {item} </p>
					</div>

					<div className="col-lg">
						<p className={`${classes.contactDetails }  `}> {Details[item]} </p>
					</div>
				</div>
			)
	)

	const getAcceptantValue = (value) => {
		isAcceptant = value
	}

	useEffect(()=>{
		if(status==='completed'){
			console.log(data)
			// dispatch(RegisterActions.showStep4())
		}
	},[status])

	const SubmitHandeler = () => {
		if(isAcceptant){
			console.log(idToken)
			sendRequest(idToken)
		}
		else{
			console.log("resend")
		}
	}


	return (
		<div className= {`container ${classes.Steps} text-center`}>
      <h3>Contact Details</h3>
      <p className={classes['stepParagraph']}>We’ll send auction update and notifications to your email</p>

			{ContactDetails}

			<p className= {` ${classes['notification']} fw-bolder pt-3`}>
				Would you like to verify this account?
			</p>

			<RadioButton name="UsePhoneNum" values={["Yes" , "No"]} getValue={getAcceptantValue} />

			{error && <p className={`${classes['alert']} p-2 text-center fs-6 `} > {error} </p> }

			<Buttons prev="Step2" nxt="Step4" onClick = {SubmitHandeler} />

		</div>
	 );
}

export default Step3;