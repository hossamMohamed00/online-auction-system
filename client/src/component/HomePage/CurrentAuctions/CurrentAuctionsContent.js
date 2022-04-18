import React, { useState } from 'react';
import { Card, Col, Row} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'

import itemImage1 from '../../../assets/pexels-designecologist-1779487.jpg'
import itemImage2 from '../../../assets/pexels-pixabay-38568.jpg'
import itemImage3 from '../../../assets/pexels-antony-trivet-9897933.jpg'

import classes from './CurrentAuctions.module.css'



const CurrentAuctionsItems = [
	{ 'ItemImageSrc' 			: itemImage1 ,
		'ItemName'				: 'Labtop',
		'ItemCategory' 		: 'Labtop ',
		'ItemDescription' : 'IPhone description '
	},
	{ 'ItemImageSrc' 			: itemImage2 ,
		'ItemName'				: 'IPhone',
		'ItemCategory' 		: 'Screens ',

		'ItemDescription' : 'IPhone description '
	},
	{ 'ItemImageSrc' 			: itemImage3 ,
		'ItemName'				: 'Watch',
		'ItemCategory' 		: 'Watches ',

		'ItemDescription' : 'Watch description '
	},
	{ 'ItemImageSrc' 			: itemImage3 ,
	'ItemName'				: 'Watch',
	'ItemCategory' 		: 'Watches ',

	'ItemDescription' : 'Watch description '
	}
]


const CurrentAuctionsContent = () => {

	const FirstThreeItems =  CurrentAuctionsItems.slice(0,3)
	const RestItems 			=  CurrentAuctionsItems.slice(3)
	const [showRestItems , setShowRestItems] = useState(false)


	const RestItemsHandeler = (e) => {
		e.preventDefault();
		setShowRestItems(true)
	}

	const getCurrentAuctions = (Items , animate) => {
		return(
			Items.map((item , idx) => (
				<Col key={idx}>
					<Card className= {` mb-3 ${classes.CurrentAuctionsCard} ${animate ? classes.animation : ''} `}>

						{/* Card item category */}
						<Card.Img variant="top" src={item['ItemImageSrc']}/>
						<div className={classes.CardItemCategory}> {item['ItemCategory']} </div>
						<div className={classes.CardAuctionDetails}>
							<span> 5 h</span>
							<span> 3 m</span>
							<span> 2 s</span>
						</div>

						<Card.Body>
							<Card.Title className='fw-bold'> {item['ItemName']} </Card.Title>
							<Card.Text className={classes.CardItemDesc}> {item['ItemDescription']} </Card.Text>

							<button className={`${classes.CardFooter} btn col-6   `}> Place A Bid </button>
						</Card.Body>
					</Card>
				</Col>
			))
			)
	}

	return (
		<div className={classes.CurrentAuctionsContent}>
			<Row xs={1} md={2} lg={3} className="g-4 mx-auto py-3">
				{getCurrentAuctions(FirstThreeItems , false)}
				{showRestItems && getCurrentAuctions(RestItems, true)}
				{!showRestItems && RestItems.length!==0 &&
					<button className= {` text-light col-12 ${classes.btnGetAuctions}`} onClick={RestItemsHandeler}>
						See All Auctions <span></span>
						<FontAwesomeIcon icon={faCircleArrowRight} />
					</button>}
			</Row>


		</div>
	);
}

export default CurrentAuctionsContent;