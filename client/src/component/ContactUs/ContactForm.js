import React, { useRef } from "react";

// import style of Contact us
import classes from './ContactForm.module.css'

const ContactForm = (props) => {
	const nameRef = useRef()
	const EmailRef = useRef()
	const MessageRef = useRef()

	const submitHandeler = (e) => {
		e.preventDefault()
		const values = {
			"name":nameRef.current.value,
			"email":EmailRef.current.value,
			"message":MessageRef.current.value
		}
		props.SendComplaint(values)
	}
	const FormControlStyle = `form-control ${classes['form-control']}`

	return(
		<React.Fragment>
			<div className={` ${classes.ContactForm} p-0`} >
				<h2 className="text-center"> <span className={classes.AnoutherWay}> Or Send </span> A Complaint</h2>
				{/* satrt contact form */}
					<form className={classes.ContactFormDetails}>
						<div className="d-flex flex-column w-100">
							<label className="py-2 pb-1"> Name </label>
							<input type="text" className={FormControlStyle} ref={nameRef} />
						</div>

						<div className="d-flex flex-column mt-2 w-100">
							<label className="py-2 pb-1"> Email </label>
							<input type="email"  className={FormControlStyle} ref={EmailRef}/>
						</div>

						<div className="d-flex flex-column mt-2 w-100">
							<label className="py-2 pb-1"> Message </label>
							<textarea className={`${FormControlStyle} `} ref={MessageRef} ></textarea>
						</div>
						<button className={`${classes.btnSubmit} `} onClick={submitHandeler} > Submit </button>

					</form>

				{/* end contact form */}

			</div>
		</React.Fragment>
	)
}

export default ContactForm ;