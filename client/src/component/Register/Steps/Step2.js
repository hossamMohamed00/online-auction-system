import React, { useRef }  from "react"
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../store/slices/RegisterSlices/isAuth";
import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";
import classes from './Steps.module.css'

const Step2 = () => {
	let isAcceptant;
	const phoneNumRef = useRef()

	const getAcceptantValue = (value) => {
		console.log(value)
		isAcceptant = value
	}

	const dispatch 		= useDispatch()

	const submitStep2Handeler = () => {
		if(isAcceptant==="Yes"){
			dispatch(AuthActions.isAuthStep2({phoneNum: phoneNumRef.current.value}))
		}
		else{
			dispatch(AuthActions.isAuthStep2({phoneNum: 'not acceptant'}))

		}


	}

	return(
		<div className="container">
			<h3> Account Setup</h3>
			<p className={classes['stepParagraph']}> This Step to ensure you're a real person
 					by adding a phone number
			</p>

			<div className="input-group my-4">
  			<button className= {` ${classes.btnPhoneNum} btn`} type="button" id="phoneNum"> 20</button>
  			<input type="text" className="form-control" placeholder="" ref = {phoneNumRef} />

			</div>

			<p className= {` ${classes['notification']} `}>
				Use this phone number for Bidding?
			</p>


			<RadioButton name="UsePhoneNum" values={["Yes" , "No"]}  getValue={getAcceptantValue}/>

			<Buttons prev="Step1" nxt="Step3" onClick={submitStep2Handeler} />

		</div>

	)
}

export default Step2;