import React, { useState , useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SubmitComplaintInSystem } from '../../Api/usersApi';
import useHttp from '../../CustomHooks/useHttp';

import Navbar from '../HomePage/Header/Navbar';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import {toast , ToastContainer} from 'react-toastify'
// import style of Contact us
import classes from './ContactUs.module.css';

const ContactUs = () => {
	// start formIsValid
	const idToken = useSelector(store => store.AuthData.idToken)

	const {sendRequest , status , error } = useHttp(SubmitComplaintInSystem)

	const SendComplaintHandler = values => {
		if(!idToken){
			toast.error("Can't Send Complaint Please Login First ⚠️ ")
		}
		else if(values && idToken){
			const CompliantDetails = {
				"reason" : values.message ,
				"from" : values.email
			}
			sendRequest({CompliantDetails , idToken })
		}
		else{
			toast.error(" Please Fill All Required Data to submit a compliant ❓")
		}
	};

	useEffect(()=>{
		if(status==='completed'){
			toast.success("Complaint Added Successfully ❤️‍🔥 ")
		}
	},[status])

	useEffect(()=>{
		if(status==='error'){
			toast.error(error)
		}
	},[status])


	return (
		<React.Fragment>
			<Navbar />
			<ToastContainer theme='dark'></ToastContainer>
			<div className={` ${classes.ContactUs} container-fluid p-0`}>
				<Row className="h-100 m-0 p-0">
					{/* start Contact us deatils */}
					<Col lg={3} md={4} sm={12} className="mb-3">
						<ContactDetails />
					</Col>

					{/* start Contact us Form */}
					<Col lg={8} md={8} sm={12} className="mb-3">
						<ContactForm SendComplaint={SendComplaintHandler} />
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default ContactUs;
