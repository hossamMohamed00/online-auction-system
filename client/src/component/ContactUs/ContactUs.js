import React from "react";
import Navbar from "../HomePage/Header/Navbar";

// import style of Contact us
import classes from './ContactUs.module.css'

const ContactUs = () => {
	return(
		<React.Fragment>
			<Navbar/>
			<div className={` ${classes.ContactUs} container `} >
				<h3 className="text-center "> Contact Us </h3>

			</div>
		</React.Fragment>
	)
}

export default ContactUs ;