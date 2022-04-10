import React from "react";
import { useSelector } from "react-redux";
import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";

import classes from './Steps.module.css'


const  Step3 = () => {


	const email 			= useSelector(store => store.RegisterAuth.step1Details.email)
	const phoneNumber = useSelector(store => store.RegisterAuth.step2Details.phoneNum)

	const Details = { "Email" : email , "PhoneNumber" : phoneNumber}
	console.log(phoneNumber)

	const ContactDetails =
		Object.keys(Details).map(item => (
				<div className="row bg-light my-3" key={item}>
					<div className="col-lg-4 bg-primary ">
							<p className={`${classes.contactDetails} text-center text-light`}> {item} </p>
					</div>
					<div className="col-lg">
						<p className={`${classes.contactDetails }  `}> {Details[item]} </p>
					</div>
				</div>
			)
		)



	return (
		<div className="container text-center">
      <h3>Contact Details</h3>
      <p className={classes['stepParagraph']}>We’ll send auction update and notifications to:</p>

			{ContactDetails}



			<p className= {` ${classes['notification']} text-center fw-bolder pt-3`}>
				How would you like to verify this account?
			</p>


			<RadioButton name="UsePhoneNum" values={["Yes" , "No"]} />

			<Buttons prev="Step2" nxt="Step4"/>

		</div>
	 );
}

export default Step3;