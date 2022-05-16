import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {Col , Row} from 'react-bootstrap'

import itemImage from '../../../assets/pexels-pixabay-38568.jpg'
import classes from './ViewCurrentAuction.module.css'

import AuctionHeader from './AuctionHeader';
import AuctionFooter from './AuctionFooter';

import Slider from '../../UI/Carousel/Carousel';

import useHttp from '../../../CustomHooks/useHttp';
import { getSingleAuction } from '../../../Api/AuctionsApi';


const ViewCurrentAuction = () => {
	const location = useLocation()
	const AuctionId = new URLSearchParams(location.search).get('id')


	const {sendRequest , status , data } = useHttp(getSingleAuction);

	useEffect(()=>{
		sendRequest(AuctionId)
	} , [sendRequest ])

	const AuctionData = data && status==='completed' && data
	const ClosedAuction = AuctionData && AuctionData.status==='closed'
	// const imageSlider =


	return (
		<div className='container'>
			<Row className={ `${classes.ViewCurrentAuction} m-0 p-0 h-100`} >
				<Col lg={6} className= {classes.ItemImage}>
				{data && (data.item.image && data.item.image.length === 1)  ?
					<img src={data && data.item.image ? data.item.image :itemImage } className='rounded-3' alt="itemImage" />
					: 	<Slider>
					{/* {data && data.item.image.map((img , index)=>(
						<img src={img} className='rounded-3' alt={`itemImage ${index}`} />
					))} */}
					<img src={data && data.item.image ? data.item.image :itemImage } className='rounded-3' alt="itemImage" />
					<img src={itemImage} alt="itemImage" className='w-100 rounded-3'/>
					</Slider>
				}

				</Col>

				<Col lg={6} className={classes.Auction} >
					<AuctionHeader AuctionData = {AuctionData} />
					{!ClosedAuction && <AuctionFooter AuctionStatus = {AuctionData && AuctionData.status} /> }
				</Col>

			</Row>
		</div>
	);
}

export default ViewCurrentAuction;