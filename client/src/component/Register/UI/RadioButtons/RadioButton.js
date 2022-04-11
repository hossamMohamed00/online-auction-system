import React, { useState } from "react";

/* Arguments [props] to RadioButton
	** name
	** values[]
*/

const inputClasses = 'form-check-input '
const labelClasses = 'form-check-label text-light fw-bold	 '

const RadioButton = (props) => {
	const initialState = props.values[0]
	const [Value , setValue] = useState(initialState)


	const onChangeHandeler = (e) => {
		console.log(e.target )
		setValue(e.target.value)
	}

	console.log(props.values)
	props.getValue(Value)
	return(
		<div className={` mt-3 pb-3 `}>
				{props.values.map(btn => (
				<div className="form-check form-check-inline m-auto mx-3" key={btn} onChange={onChangeHandeler}  >
					<input className={inputClasses} name={props.name} type="radio" id={btn} value={btn} defaultChecked = {Value === btn} />
					<label className={labelClasses} htmlFor={btn}> {btn} </label>
				</div>
				)) }

		</div>
	)
}

export default RadioButton ;