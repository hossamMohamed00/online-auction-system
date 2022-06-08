import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Navbar from '../../HomePage/Header/Navbar';
import classes from './ViewCurrentAuction.module.css';

import AuctionHeader from './AuctionHeader';
import AuctionFooter from './AuctionFooter';

import Slider from '../../UI/Carousel/Carousel';

import useHttp from '../../../CustomHooks/useHttp';
import { getSingleAuction } from '../../../Api/AuctionsApi';
import { io } from 'socket.io-client';
import BiddingDetails from './BiddingDetails';
import { toast } from 'react-toastify';
import ModalUi from '../../UI/Modal/modal';
import NoData from '../../UI/NoData';

const ViewCurrentAuction = React.memo(() => {
	const location = useLocation();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const role = useSelector(store => store.AuthData.role);
	const email = useSelector(store => store.AuthData.email);

	// show all bids when bidder is joined
	const [isShowBids, setIsShowBids] = useState('');
	const [BidderIsJoined, setBidderIsJoined] = useState('');
	const [BidderIsBid, setBidderIsBid] = useState('');

	const [socket, setSocket] = useState(null);
	const [roomData, setRoomData] = useState([]);

	const { sendRequest, status, data, error } = useHttp(getSingleAuction);

	// start join auction
	const accessToken = useSelector(store => store.AuthData.idToken);
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	const [AuctionEndMessage, setAuctionEndMessage] = useState('');
	const [BidderWinner, setBidderWinner] = useState('');
	const [BidderMessage, setBidderMessage] = useState();

	// establish socket connection
	useEffect(() => {
		if (BidderIsJoined && accessToken) {
			setSocket(
				io('http://localhost:8000/auction/bidding', {
					extraHeaders: {
						authorization: `Bearer ${accessToken}`,
					},
				}),
			);
		}
	}, [BidderIsJoined, accessToken]);

	useEffect(() => {
		if (!!socket && BidderIsJoined && isLoggedIn) {
			socket.on('room-data', data => {
				setRoomData(data);
			});
		}
	}, [BidderIsJoined, !!socket]);

	useEffect(() => {
		if (!!socket) {
			socket.on('auction-ended', data => {
				setAuctionEndMessage(data.message);
				socket.emit('get-winner', {
					auctionId: AuctionId,
				});
				setIsShowBids(false);
				toast.success(data.message);
			});
		}
	}, [!!socket]);

	useEffect(() => {
		if (!!socket) {
			socket.on('winner-bidder', data => {
				setBidderWinner(true);
				if (data.winnerEmail === email) {
					setBidderMessage(data.winnerMessage);
				} else {
					setBidderMessage(data.message);
				}

				const timer = setTimeout(() => {
					localStorage.removeItem('BidderIsJoined');
					window.location.reload();
				}, [3000]);
				return () => clearTimeout(timer);
			});
		}
	}, [!!socket]);

	// start new Bidding

	// end join auction

	useEffect(() => {
		sendRequest(AuctionId);
	}, [sendRequest]);

	const AuctionData = data && status === 'completed' && data;
	const ClosedAuction = AuctionData && AuctionData.status === 'closed';
	return (
		<React.Fragment>
			{AuctionData && (
				// show when Auction Data is Found and loaded
				<div className="container-fluid">
					{role !== 'admin' && <Navbar />}
					<Row className={`${classes.ViewCurrentAuction} m-0 p-0 h-100`}>
						<Col lg={5} className={classes.ItemImage}>
							{/* start Bidding Details */}
							{AuctionData &&
								(AuctionData.status === 'ongoing' || 'closed') && (
									<BiddingDetails
										roomData={
											roomData.auctionDetails
												? roomData.auctionDetails
												: AuctionData
										}
										isShowBids={isShowBids}
										BidderIsBid={BidderIsBid}
									/>
								)}
							{/* end Bidding Details */}
							<Slider>
								{data &&
									data.item.images.map(image => (
										<img
											src={image.url}
											className="rounded-3"
											alt="itemImage"
											key={image.publicId}
										/>
									))}
							</Slider>
						</Col>

						<Col lg={7} className={classes.Auction}>
							{
								<AuctionHeader
									AuctionData={AuctionData}
									isShownBidsProp={isShowBids}
									socket={socket}
									BidderIsJoined={BidderIsJoined}
									BidderIsBid={BidderIsBid}
									roomData={roomData ? roomData : AuctionData}
									BidderWinner={BidderWinner}
								/>
							}
							{!ClosedAuction && (
								<AuctionFooter
									AuctionStatus={AuctionData && AuctionData.status}
									sellerEmail={AuctionData && AuctionData.seller.email}
									showBids={value => setIsShowBids(value)}
									socket={socket}
									setBidderJoin={value => setBidderIsJoined(value)}
									setBidderIsBid={value => setBidderIsBid(value)}
									MinimumBidAllowed={
										roomData.auctionDetails &&
										roomData.auctionDetails['minimumBidAllowed']
									}
									chairCost={AuctionData && AuctionData.chairCost}
									AuctionEndMessage={!!AuctionEndMessage}
									RejectionMessage={AuctionData && AuctionData.rejectionMessage}
								/>
							)}
						</Col>
					</Row>

					{/* Modal to Show Bidder-Winner */}
					{BidderWinner && (
						<ModalUi
							show={BidderWinner}
							onHide={() => setBidderWinner(false)}
							title={BidderMessage}
							btn=""
						/>
					)}
				</div>
			)}
			{/* // show when Auction Data is not Found */}
			<NoData text="Auction Not Found " data={AuctionData} error={error} />
		</React.Fragment>
	);
});

export default ViewCurrentAuction;
