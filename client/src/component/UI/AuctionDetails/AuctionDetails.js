import React from 'react';
import { Card, Col, Row} from 'react-bootstrap';


import classes from './AuctionDetails.module.css'
import useTimer from '../../../CustomHooks/useTimer';
import { Link , useLocation } from 'react-router-dom';



const AuctionDetails = (props)=> {

	const location = useLocation()

	const {days , hours , minutes , seconds } = useTimer(props.AuctionDate)

	const getAuctionDetails = (Items , animate) => {
		return(
			Items.map((item , idx) => (
				<Col key={idx}>
					<Card className= {` mb-3 ${classes.CurrentAuctionsCard} ${animate ? 'animation' : ''} `}>

						{/* Card item category */}
						<Card.Img variant="top" src={item['ItemImageSrc']}/>
						<div className={classes.CardItemCategory}> {item['ItemCategory']} </div>
						<div className={classes.CardAuctionDetails}>
							<span> {days} Days </span>
							<span> {hours} h</span>
							<span> {minutes} m</span>
							<span> {seconds} s</span>
						</div>

						<Card.Body>
							<Card.Title className='fw-bold'> {item['ItemName']} </Card.Title>
							<Card.Text className={classes.CardItemDesc}> {item['ItemDescription']} </Card.Text>

							<Link className={`${classes.CardFooter} btn col-6  `} to = {`${location.pathname}/auctions/${item.id}`} > Place A Bid </Link>

						</Card.Body>
					</Card>
				</Col>
			))
			)
	}

	return (
		<div className={classes.CurrentAuctionsContent}>
			<Row xs={1} sm={2} lg={3} className="g-4 mx-auto py-3">
				{getAuctionDetails(props.AuctionData , false)}

			</Row>


		</div>
	);
}

export default AuctionDetails;