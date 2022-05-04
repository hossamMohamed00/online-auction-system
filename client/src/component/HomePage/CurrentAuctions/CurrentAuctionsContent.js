import React, {useState } from 'react';
import { Card, Col, Row} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'

import itemImage1 from '../../../assets/pexels-designecologist-1779487.jpg'
import itemImage2 from '../../../assets/pexels-pixabay-38568.jpg'
import itemImage3 from '../../../assets/pexels-antony-trivet-9897933.jpg'

import classes from './CurrentAuctions.module.css'
import useTimer from '../../../CustomHooks/useTimer';
import { Link , useLocation } from 'react-router-dom';


const CurrentAuctionsItems = [
	{ 'id'							: Math.random(),
		'ItemImageSrc' 		: itemImage1 ,
		'ItemName'				: 'Labtop',
		'ItemCategory' 		: 'Labtop ',
		'ItemDescription' : 'IPhone description '
	},
	{ 'id'							: Math.random() ,
		'ItemImageSrc' 		: itemImage2 ,
		'ItemName'				: 'IPhone',
		'ItemCategory' 		: 'Screens ',

		'ItemDescription' : 'IPhone description '
	},
	{ 'id'							: Math.random() ,
		'ItemImageSrc' 		: itemImage3 ,
		'ItemName'				: 'Watch',
		'ItemCategory' 		: 'Watches ',

		'ItemDescription' : 'Watch description '
	},
	{'id'							: Math.random() ,
	'ItemImageSrc' 		: itemImage3 ,
	'ItemName'				: 'Watch',
	'ItemCategory' 		: 'Watches ',

	'ItemDescription' : 'Watch description '
	}
]


const CurrentAuctionsContent = () => {

	const location = useLocation()

	const FirstThreeItems =  CurrentAuctionsItems.slice(0,3)
	const RestItems 			=  CurrentAuctionsItems.slice(3)
	const [showRestItems , setShowRestItems] = useState(false)

	const RestItemsHandeler = (e) => {
		e.preventDefault();
		setShowRestItems(true)
	}


	const AuctionDate = new Date('Fri Apr 29 2022 16:13:00');

	const {days , hours , minutes , seconds } = useTimer(AuctionDate)

	const getCurrentAuctions = (Items , animate) => {
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
				{getCurrentAuctions(FirstThreeItems , false)}
				{showRestItems && getCurrentAuctions(RestItems, true)}
				{!showRestItems && RestItems.length!==0 &&
					<div className='w-100'>
						<button className= {` text-light ${classes.btnGetAuctions}`} onClick={RestItemsHandeler}>
							See All Auctions <span></span>
							<FontAwesomeIcon icon={faCircleArrowRight} />
						</button>
					</div>
				}
			</Row>


		</div>
	);
}

export default CurrentAuctionsContent;