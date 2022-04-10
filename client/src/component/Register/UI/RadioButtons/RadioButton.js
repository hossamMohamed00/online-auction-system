import React, { useState } from "react";

/* Arguments [props] to RadioButton
	** name
	** values[]
*/

const inputClasses = 'form-check-input '
const labelClasses = 'form-check-label text-light fw-bold	 fs-6 '

const RadioButton = React.forwardRef((props , ref) => {
	const [value , setValue] = useState('')


	const onChangeHandeler = (e) => {
		setValue(e.target.value)
	}

	console.log(props.values)
	return(
		<div className={` mt-3 pb-3 m-auto `}>
				{props.values.map(btn => (
				<div className="form-check form-check-inline px-4 py-3 " key={btn}>
					<input className={inputClasses} name={props.name} type="radio" id={btn} value={value} onChange={onChangeHandeler} ref={ref} checked/>
					<label className={labelClasses} htmlFor={btn}> {btn} </label>
				</div>
				)) }

		</div>
	)
})

export default RadioButton ;