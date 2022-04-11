import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../../store/slices/RegisterSlices/isAuth";
import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";

import classes from './Steps.module.css'


const  Step3 = () => {

	//const [isAcceptant , setIsAcceptant] = useState()
	let isAcceptant

	const email 			= useSelector(store => store.RegisterAuth.step1Details.email)
	const phoneNumber = useSelector(store => store.RegisterAuth.step2Details.phoneNum)

	const Details = { "Email" : email , "PhoneNumber" : phoneNumber}

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

	const getAcceptantValue = (value) => {
		isAcceptant = value
	}


	const dispatch = useDispatch()


	const SubmitHandeler = () => {
			dispatch(AuthActions.isAuthStep3({acceptDetails : isAcceptant}))
	}

	return (
		<div className="container text-center">
      <h3>Contact Details</h3>
      <p className={classes['stepParagraph']}>We’ll send auction update and notifications to:</p>

			{ContactDetails}

			<p className= {` ${classes['notification']} text-center fw-bolder pt-3`}>
				How would you like to verify this account?
			</p>


			<RadioButton name="UsePhoneNum" values={["E-mail" , "Phone"]} getValue={getAcceptantValue} />

			<Buttons prev="Step2" nxt="Step4" onClick = {SubmitHandeler} />

		</div>
	 );
}

export default Step3;