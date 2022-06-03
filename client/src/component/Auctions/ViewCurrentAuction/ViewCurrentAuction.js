import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Navbar from '../../HomePage/Header/Navbar';
import itemImage from '../../../assets/pexels-pixabay-38568.jpg';
import classes from './ViewCurrentAuction.module.css';

import AuctionHeader from './AuctionHeader';
import AuctionFooter from './AuctionFooter';

import Slider from '../../UI/Carousel/Carousel';

import useHttp from '../../../CustomHooks/useHttp';
import { getSingleAuction } from '../../../Api/AuctionsApi';
import { io } from 'socket.io-client';
import BiddingDetails from './BiddingDetails';

const ViewCurrentAuction = () => {
	const location = useLocation();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const role = useSelector(store => store.AuthData.role);

	// show all bids when bidder is joined
	const [isShowBids , setIsShowBids] = useState('')

	const { sendRequest, status, data } = useHttp(getSingleAuction);

	// start join auction
	const accessToken = useSelector(store => store.AuthData.idToken);


	// establish socket connection
	const socket = io('http://localhost:8000/auction/bidding', {
		extraHeaders: {
			authorization: `Bearer ${accessToken}`,
		},
	});


	// end join auction

	useEffect(() => {
		sendRequest(AuctionId);
	}, [sendRequest]);

	const AuctionData = data && status === 'completed' && data;
	const ClosedAuction = AuctionData && AuctionData.status === 'closed';

	return (
		<div className="container-fluid">
			{role !== 'admin' && <Navbar />}
			<Row className={`${classes.ViewCurrentAuction} m-0 p-0 h-100`}>
				<Col lg={5} className={classes.ItemImage}>
					{/* start Bidding Details */}
						<BiddingDetails socket={socket} isShowBids={isShowBids} />
					{/* end Bidding Details */}

					{data && data.item.image && data.item.image.length === 1 ? (
						<img
							src={data && data.item.image ? data.item.image : itemImage}
							className="rounded-3 "
							alt="itemImage"
						/>
					) : (
						<Slider>
							<img
								src={data && data.item.image ? data.item.image : itemImage}
								className="rounded-3"
								alt="itemImage"
							/>
							<img
								src={itemImage}
								alt="itemImage"
								className="w-100 rounded-3"
							/>
						</Slider>
					)}
				</Col>

				<Col lg={7} className={classes.Auction}>
					<AuctionHeader AuctionData={AuctionData} isShownBidsProp = {isShowBids} socket ={socket} />
					{!ClosedAuction && (
						<AuctionFooter AuctionStatus={AuctionData && AuctionData.status} showBids={(value) => setIsShowBids(value)} socket ={socket} />
					)}
				</Col>
			</Row>
		</div>
	);
};

export default ViewCurrentAuction;
