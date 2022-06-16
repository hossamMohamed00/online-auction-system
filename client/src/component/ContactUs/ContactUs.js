import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { SubmitComplaintInSystem } from '../../Api/usersApi';
import useHttp from '../../CustomHooks/useHttp';

import Navbar from '../HomePage/Header/Navbar';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import { toast, ToastContainer } from 'react-toastify';
// import style of Contact us
import classes from './ContactUs.module.css';

const ContactUs = () => {
	// start formIsValid
	const { sendRequest, status, error } = useHttp(SubmitComplaintInSystem);

	const SendComplaintHandler = values => {
		if (values) {
			const CompliantDetails = {
				reason: values.message,
				from: values.email,
			};
			sendRequest(CompliantDetails);
		} else {
			toast.error(
				'You must fill all fields before submitting you complaint ❌',
			);
		}
	};

	useEffect(() => {
		if (status === 'completed') {
			toast.success('You complaint submitted successfully to our team 🎉');
		}
	}, [status]);

	useEffect(() => {
		if (status === 'error') {
			toast.error(error);
		}
	}, [status]);

	return (
		<React.Fragment>
			<Navbar />
			<ToastContainer theme="dark"></ToastContainer>
			<div className={` ${classes.ContactUs} container-fluid p-0`}>
				<Row className="h-100 m-0 p-0">
					{/* start Contact us details */}
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
