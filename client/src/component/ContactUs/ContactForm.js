import React, { useRef, useState } from 'react';
import Input from '../UI/Input/input';

// import style of Contact us
import classes from './ContactForm.module.css';

const ContactForm = props => {
	const nameRef = useRef();
	const EmailRef = useRef();

	const [Messagevalue, setMessagevalue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

<<<<<<< HEAD
	const validateText = value => value.trim() !== '';
	const validateEmail = value => value.trim().includes('@');

	const isValid = validateText(Messagevalue);
=======
	const vaildteText = value => value.trim() !== '';
	const vaildteEmail = value => value.trim().includes('@');

	const isValid = vaildteText(Messagevalue);
>>>>>>> main
	const hasError = isTouched && !isValid;

	let errorNameMessage = 'Please Enter Your Name';
	let errorEmailMessage = 'Please Enter Your Email';
	let errorMessage = 'Please Enter Your Complaint  ';

	const textAreaChangeHandler = e => {
		setMessagevalue(e.target.value);
	};
	const textAreaBlurHandler = e => {
		setIsTouched(true);
	};

<<<<<<< HEAD
	const submitHandler = e => {
=======
	const submitHandeler = e => {
>>>>>>> main
		e.preventDefault();
		const values = {
			name: nameRef.current.value,
			email: EmailRef.current.value,
			message: Messagevalue,
		};
		props.SendComplaint(values);
	};
	const FormControlStyle = `form-control ${classes['formControl']}`;

	return (
		<React.Fragment>
			<div className={` ${classes.ContactForm} p-0`}>
				<h2 className="text-center">
					{' '}
<<<<<<< HEAD
					<span className={classes.AnotherWay}> Or Send </span> A Complaint
				</h2>
				{/* start contact form */}
=======
					<span className={classes.AnoutherWay}> Or Send </span> A Complaint
				</h2>
				{/* satrt contact form */}
>>>>>>> main
				<form className={classes.ContactFormDetails}>
					<div className="d-flex flex-column w-100">
						<label className="pb-1"> Name </label>
						<Input
							type="text"
							name="text"
<<<<<<< HEAD
							validateText={validateText}
=======
							validateText={vaildteText}
>>>>>>> main
							ref={nameRef}
							errorMassage={errorNameMessage}
						/>
					</div>

					<div className="d-flex flex-column w-100">
						<label className="pb-1"> Email </label>
						<Input
							type="email"
							name="email"
<<<<<<< HEAD
							validateText={validateEmail}
=======
							validateText={vaildteEmail}
>>>>>>> main
							ref={EmailRef}
							errorMassage={errorEmailMessage}
						/>
					</div>

					<div className="d-flex flex-column w-100">
						<label className="pb-1"> Message </label>
						<textarea
							className={`${FormControlStyle} `}
							onChange={textAreaChangeHandler}
							onBlur={textAreaBlurHandler}
							value={Messagevalue}
						></textarea>
						{hasError && (
							<p className={classes.textAreaError}> {errorMessage} </p>
						)}
					</div>
<<<<<<< HEAD
					<button className={`${classes.btnSubmit} `} onClick={submitHandler}>
=======
					<button className={`${classes.btnSubmit} `} onClick={submitHandeler}>
>>>>>>> main
						{' '}
						Submit{' '}
					</button>
				</form>

				{/* end contact form */}
			</div>
		</React.Fragment>
	);
};

export default ContactForm;
