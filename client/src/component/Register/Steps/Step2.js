import React, { useRef }  from "react"
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../../store/slices/RegisterSlices/userDetails";
import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";
import classes from './Steps.module.css'

const Step2 = () => {
	let phoneNum = useSelector(store=>store.userDetails.step2Details.phoneNum)

	let isAcceptant;
	const phoneNumRef = useRef()

	const getAcceptantValue = (value) => {
		isAcceptant = value
	}

	const dispatch 		= useDispatch()

	const submitStep2Handeler = () => {
		if(isAcceptant==="Yes"){
			dispatch(AuthActions.setStep2Details({phoneNum: phoneNumRef.current.value}))
		}
		else{
			dispatch(AuthActions.setStep2Details({phoneNum: 'not acceptant'}))
		}


	}

	return(
		<div className= {`container ${classes.Steps} `}>
			<h3> Account Setup</h3>
			<p className={classes['stepParagraph']}> This Step to ensure you're a real person
 					by adding a phone number
			</p>

			<div className="input-group my-4">
  			<button className= {` ${classes.btnPhoneNum} btn`} type="button" id="phoneNum"> 20</button>
  			<input type="text" className="form-control" placeholder= {phoneNum 	? phoneNum :''} ref = {phoneNumRef} />

			</div>

			<p className= {` ${classes['notification']} `}>
				Use this phone number for Bidding?
			</p>


			<RadioButton name="UsePhoneNum" values={["Yes" , "No"]}  getValue={getAcceptantValue} changeValue={phoneNum ? 'Yes' : 'No'}/>

			<Buttons prev="Step1" nxt="Step3" onClick={submitStep2Handeler} />

		</div>

	)
}

export default Step2;