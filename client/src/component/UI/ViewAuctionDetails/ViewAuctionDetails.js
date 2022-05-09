import React from 'react';
import { Card, Col, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import useTimer from '../../../CustomHooks/useTimer';

import itemImage1 from '../../../assets/pexels-designecologist-1779487.jpg'

import classes from './ViewAuctionDetails.module.css'


const ViewAuctionDetails = (props) => {

	const getDate = (AuctionDate) => {
		const timer = useTimer(AuctionDate) ;
			return(
			<>
			<span> {timer.days} Days </span>
			<span> {timer.hours} h</span>
			<span> {timer.minutes} m</span>
			<span> {timer.seconds} s</span>
			</>
		)
	}



	const getAuctionDetails = (Items , animate) => {
		return(
			Items.map((item , idx) => (
				<Col key={idx}>
					<Card className= {` mb-5 ${classes.CurrentAuctionsCard} ${animate ? 'animation' : ''} `}>

						{/* Card item category */}
						<Card.Img variant="top" src={itemImage1}/>
						<div className={classes.CardItemCategory}> {item.category.name} </div>
						<div className={classes.CardAuctionDetails}>
							{getDate(new Date(item.endDate))}
						</div>

						<Card.Body>
							<Card.Title className='fw-bold fs-5'> {item['title']} </Card.Title>
							<Card.Text className=''>
								<p className={classes.Description} > {item['item']['shortDescription']} </p>
								<p> Creator : {item.seller.name} </p>
								<p className={classes.MinmumBid}> Minimum Bid Allowed: {item['minimumBidAllowed']} </p>
							</Card.Text>

							<Link className={`${classes.CardFooter} btn col-6  `} to = {`/auctions?id=${item._id}`} >  View Details </Link>

						</Card.Body>
					</Card>
				</Col>
			))
			)
	}

	return (
		<div className={classes.CurrentAuctionsContent}>
			<Row xs={1} sm={2} lg={3} className="g-4 mx-auto py-3">
				{getAuctionDetails(props.AuctionData , props.animate)}

			</Row>


		</div>
	);
}

export default ViewAuctionDetails;