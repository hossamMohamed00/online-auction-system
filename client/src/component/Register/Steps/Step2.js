import React, { useRef }  from "react"
import { useDispatch } from "react-redux";
import { AuthActions } from "../../../store/slices/RegisterSlices/isAuth";
import Buttons from "../UI/Prev&NxtButtons/Buttons";
import RadioButton from "../UI/RadioButtons/RadioButton";
import classes from './Steps.module.css'

const Step2 = () => {
	const dispatch 		= useDispatch()
	const phoneNumRef = useRef()

	const submitStep2Handeler = () => {
		dispatch(AuthActions.isAuthStep2({phoneNum:phoneNumRef.current.value}))
	}

	return(
		<div className="container">
			<h3> Account Setup</h3>
			<p className={classes['stepParagraph']}> This Step to ensure you're a real person
 					by adding a phone number
			</p>

			<div className="input-group my-5">
  			<button className= {` ${classes.btnPhoneNum} btn`} type="button" id="phoneNum"> 20</button>
  			<input type="text" className="form-control" placeholder="" ref = {phoneNumRef} />

			</div>

			<p className= {` ${classes['notification']} text-center`}>
				Use this phone number for outbid text notifications?
			</p>


			<RadioButton name="UsePhoneNum" values={["Yes" , "No"]} />

			<Buttons prev="Step1" nxt="Step3" onClick={submitStep2Handeler} />

		</div>

	)
}

export default Step2;