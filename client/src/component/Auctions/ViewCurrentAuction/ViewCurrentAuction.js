import React, { useCallback, useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import Modal_ from '../../UI/Modal/modal';

const ViewCurrentAuction = React.memo(() => {
	const location = useLocation();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const role = useSelector(store => store.AuthData.role);

	// show all bids when bidder is joined
	const [isShowBids , setIsShowBids] = useState('')
	const [BidderIsJoined , setBidderIsJoined] = useState('')
	const [BidderIsBid , setBidderIsBid] = useState('')
	const [BiddingAmount , setBiddingAmount] = useState('')



	const [socket , setSocket] = useState(null)
	const [roomData , setRoomData] = useState([])


	const { sendRequest, status, data } = useHttp(getSingleAuction);

	// start join auction
	const accessToken = useSelector(store => store.AuthData.idToken);
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	const [AuctionEndMessage , setAuctionEndMessage] = useState('')
	const [BidderWinner,setBidderWinner] = useState('')

	// establish socket connection
	useEffect(()=>{
		if(BidderIsJoined && accessToken){
			setSocket(io('http://localhost:8000/auction/bidding', {
					extraHeaders: {
						authorization: `Bearer ${accessToken}`,
					}}
			))
		}
	},[BidderIsJoined,accessToken])

	useEffect(()=>{
		if(socket && BidderIsJoined && isLoggedIn){
			socket.on('room-data' , data => {
				setRoomData(data)
			})
		}
	},[BidderIsJoined, socket])

	useEffect(()=>{
		if(!!socket ){
			socket.on('auction-ended' , data => {
				setAuctionEndMessage(data.message)
				localStorage.removeItem('BidderIsJoined')
				setIsShowBids(false)
				toast.success(data.message)
			})

		}
	},[!!socket])

	useEffect(()=>{
		if(AuctionEndMessage){
			socket.emit('get-winner')
			socket.on('winner-bidder' , data => {
				console.log(data)
				setBidderWinner(data)
				// toast.success(data.message)
				localStorage.removeItem('BidderIsJoined')
				setIsShowBids(false)
			})
		}

	},[AuctionEndMessage])

	// start new Bidding


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
						{ AuctionData && (AuctionData.status === 'ongoing' || 'closed') &&
							<BiddingDetails
								roomData={roomData.auctionDetails ? roomData.auctionDetails : AuctionData}
								isShowBids={isShowBids}
								BidderIsBid = {BidderIsBid}
							/>
						}
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
					{<AuctionHeader
						AuctionData={AuctionData}
						isShownBidsProp = {isShowBids}
						socket ={socket}
						BidderIsJoined={BidderIsJoined}
						BidderIsBid = {BidderIsBid}
						roomData={roomData ? roomData : AuctionData}
						AuctionEndMessage = {AuctionEndMessage}
						BidderWinner = {BidderWinner}
						/>
					 }
					{!ClosedAuction && (
						<AuctionFooter
							AuctionStatus={AuctionData && AuctionData.status}
							showBids={(value) => setIsShowBids(value)}
							socket ={socket}
							setBidderJoin={(value) => setBidderIsJoined(value)}
							setBidderIsBid={(value)=>setBidderIsBid(value)}
							MinimumBidAllowed = {roomData.auctionDetails && roomData.auctionDetails['minimumBidAllowed']}
							BiddingAmount = {(value)=> setBiddingAmount(value)}
							AuctionEndMessage = {!!AuctionEndMessage}

							RejectionMessage={AuctionData && AuctionData.rejectionMessage}
						/>
					)}
				</Col>
			</Row>

			{/* Modal to Show Bidder-Winner */}
			{BidderWinner && <Modal_
				show={BidderWinner}
				onHide={()=> setBidderWinner(false)}
				title= "Bidder Winner"

			/>}

		</div>
	);
})

export default ViewCurrentAuction;
