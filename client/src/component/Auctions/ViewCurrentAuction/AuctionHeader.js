import React, { Fragment, useEffect, useState } from 'react';
import AuctionDetails from './AuctionDetails';
import Bidders from './Bidders';
import Bids from './Bids';

import classes from './ViewCurrentAuction.module.css';

function AuctionHeader({ AuctionData, isShownBidsProp, socket, roomData }) {
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownBids, setIsShownBids] = useState(false);
	const [isShownBidders, setIsShownBidders] = useState(false);

	const btnDetailsHandler = () => {
		setIsShownDetails(true);
		setIsShownBids(false);
		setIsShownBidders(false);
	};

	const btnBidsHandler = () => {
		setIsShownDetails(false);
		setIsShownBids(true);
		setIsShownBidders(false);
	};

	const btnBiddersHandler = () => {
		setIsShownBidders(true);
		setIsShownDetails(false);
		setIsShownBids(false);
	};

	// start show bid when bidder joined in auction and want to bid
	useEffect(() => {
		if (isShownBidsProp) {
			btnBidsHandler();
		} else {
			btnDetailsHandler();
		}
	}, [isShownBidsProp]);
	// end show bid when bidder joined in auction and want to bid

	return (
		<Fragment>
			<div className={classes.AuctionHeader}>
				{/* start with auction header */}
				<button
					className={`btn ${
						isShownDetails && !isShownBids ? classes.ActiveLink : ''
					}`}
					onClick={btnDetailsHandler}
				>
					Details
				</button>

				<button
					className={`btn  ${isShownBids ? classes.ActiveLink : ''} ${
						classes.showBidsBtn
					}`}
					onClick={btnBidsHandler}
					disabled={(AuctionData && AuctionData['status']) === 'upcoming'}
				>
					<span className="position-relative"> Bids </span>
					<span className={classes.numOfBids}>
						{' '}
						{roomData && roomData.bids
							? roomData.bids.length
							: AuctionData && AuctionData.numOfBids
							? AuctionData.numOfBids
							: 0}{' '}
					</span>
				</button>

				<button
					className={`btn  ${isShownBidders ? classes.ActiveLink : ''} ${
						classes.showBiddersBtn
					}`}
					onClick={btnBiddersHandler}
					disabled={(AuctionData && AuctionData['status']) === 'upcoming'}
				>
					<span className="position-relative"> Bidders </span>
					<span className={classes.numOfBids}>
						{' '}
						{roomData && roomData.bidders
							? roomData.bidders.length
							: AuctionData && AuctionData.bidders
							? AuctionData.bidders.length
							: 0}{' '}
					</span>
				</button>
			</div>
			{/* end with auction header */}

			{isShownDetails && <AuctionDetails data={AuctionData && AuctionData} />}
			{isShownBids && (
				<Bids
					socket={socket}
					roomData={
						AuctionData && AuctionData['status'] !== 'ongoing'
							? AuctionData
							: roomData
					}
				/>
			)}
			{isShownBidders && (
				<Bidders
					roomData={
						AuctionData && AuctionData['status'] !== 'ongoing'
							? AuctionData
							: roomData
					}
				/>
			)}
		</Fragment>
	);
}

export default AuctionHeader;
