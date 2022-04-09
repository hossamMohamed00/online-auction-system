import React from "react";
import useInput from "../../../../CustomHooks/useInput";
import classes from './Input.module.css'

const Input = React.forwardRef((props , ref) => {
	const {value:InputValue ,hasError ,onChangeValueHandeler, onBlurHandeler } = useInput(props.validateText)

	let	ValidationPassword = props.name==='password' 	&& hasError && <p>Your password must be more than 8 characters </p>
	let ValidationconfirmPassword = props.name==='confirmPassword' 	&& hasError && <p>Your password must be more than 8 characters </p>

	props.getValue && props.getValue(InputValue)

	return(
			<div className="mt-2 w-75 m-auto">
				<input
					type      	= {props.type}
					value     	= {InputValue}
					placeholder = {props.placeholder}
					onChange  	= {onChangeValueHandeler}
					onBlur    	= {onBlurHandeler}
					className 	= {` form-control ${classes['form-control']} ${hasError ? classes['alarm-input'] : '' } `}
					ref 				= {ref}
				/>

				<div className={classes['alarm']}>
					{ValidationPassword}
					{ValidationconfirmPassword}
        </div>


      </div>
	)
}
)
export default Input;