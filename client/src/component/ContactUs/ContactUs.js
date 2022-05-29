import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Navbar from '../HomePage/Header/Navbar';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
// import style of Contact us
import classes from './ContactUs.module.css';

const ContactUs = () => {
	const SendComplaintHandler = values => {
		console.log(values);
	};
	return (
		<React.Fragment>
			<Navbar />
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
