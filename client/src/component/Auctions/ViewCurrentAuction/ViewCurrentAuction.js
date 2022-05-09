import React from 'react';
import { useLocation } from 'react-router-dom';

import {Col , Row} from 'react-bootstrap'

import itemImage from '../../../assets/pexels-pixabay-38568.jpg'
import classes from './ViewCurrentAuction.module.css'

import AuctionHeader from './AuctionHeader';
import AuctionFooter from './AuctionFooter';


const ViewCurrentAuction = () => {
	const location = useLocation()
	const AuctionId = new URLSearchParams(location.search).get('id')

	return (
			<Row className={ `${classes.ViewCurrentAuction} m-0 p-0 h-100`} >
				<Col lg={8} className= {classes.ItemImage}>
					<img src={itemImage} alt="itemImage" />
				</Col>

				<Col lg={4} className={classes.Auction} >
					<AuctionHeader AuctionId = {AuctionId} />
					<AuctionFooter  />

				</Col>

			</Row>
	);
}

export default ViewCurrentAuction;