import React, { Fragment, useEffect, useState } from 'react';
import AuctionDetails from './AuctionDetails';
import Bids from './Bids';

import classes from './ViewCurrentAuction.module.css';

function AuctionHeader({ AuctionData , isShownBidsProp , socket}) {
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownBids, setIsShownBids] = useState(false);


	const btnDetailsHandler = () => {
		setIsShownDetails(true);
		setIsShownBids(false);
	};

	const btnBidsHandler = () => {
		if(isShownBidsProp){
			setIsShownDetails(false);
			setIsShownBids(true);
		}

	};

	// start show bid when bidder joined in auction and want to bid
	useEffect(()=>{
		if(isShownBidsProp){
			btnBidsHandler()
		}
	},[isShownBidsProp])
	// end show bid when bidder joined in auction and want to bid


	return (
		<Fragment>
			<div className={classes.AuctionHeader}>
				<button
					className={`btn ${isShownDetails ? classes.ActiveLink : ''}`}
					onClick={btnDetailsHandler}
				>
					Details
				</button>
				{AuctionData && AuctionData.status === 'ongoing' && (
					<button
						className={`btn ${isShownBids ? classes.ActiveLink : ''} ${classes.showBidsBtn}`}
						onClick={btnBidsHandler}
						disabled = {!isShownBidsProp}
					>
						Bids
					</button>
				)}
			</div>
			{isShownDetails && <AuctionDetails data={AuctionData} />}
			{isShownBids && <Bids isShownBidsProp = {isShownBidsProp} socket={socket} />}
		</Fragment>
	);
}

export default AuctionHeader;
