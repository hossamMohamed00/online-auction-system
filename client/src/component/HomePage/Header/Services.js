import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {Card, Col, Row} from 'react-bootstrap'

import classes from './Services.module.css'

function Services() {

	const servicesData = [
		{
			icon : faDollarSign ,
			heading : "Live Bidding" ,
			text : 'Some quick example text to build on the card title and make up the bulk of the content.'
		},
		{
			icon : faDollarSign ,
			heading : "Live Bidding" ,
			text : 'Some quick example text to build on the card title and make up the bulk of the content.'
		},
		{
			icon : faDollarSign ,
			heading : "Live Bidding" ,
			text : 'Some quick example text to build on the card title and make up the bulk of the content.'
		}
	]

	const showServiceCard = servicesData.map((data , index) => (
		<Col lg={4} key={index}>
			<Card className={classes._card} key = {index} >
				<Card.Body>
					<Card.Title>
						<FontAwesomeIcon icon={data.icon} className={classes._cardIcon} />
						<h3 className='text-center mb-3 fw-bold'> {data.heading} </h3>
					</Card.Title>
					<Card.Text className={classes._cardText}>
						{data.text}
					</Card.Text>
				</Card.Body>
		</Card>
	</Col>
	))
	return (
		<>
			<div className={classes.ServeiceCard}>
				<Row>
					{showServiceCard}
				</Row>

			</div>
		</>
	);
}

export default Services;