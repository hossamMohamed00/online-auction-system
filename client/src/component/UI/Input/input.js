import React from 'react';
import useInput from '../../../CustomHooks/useInput';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
	const {
		value: InputValue,
		hasError,
		onChangeValueHandeler,
		onBlurHandeler,
	} = useInput(props.validateText);

	props.getValue && props.getValue(InputValue);

	return (
		<div>
			<input
				type={props.type}
				value={InputValue}
				placeholder={props.placeholder}
				onChange={onChangeValueHandeler}
				onBlur={onBlurHandeler}
				className={` form-control ${classes['form-control']} ${classes.input} ${
					hasError ? classes['alarm-input'] : ''
				} `}
				ref={ref}
				id={props.id ? props.id : ''}
			/>
			{hasError && (
				<p className={`${classes['alarm']} mb-2`}>{props.errorMassage}</p>
			)}
		</div>
	);
});
export default Input;
