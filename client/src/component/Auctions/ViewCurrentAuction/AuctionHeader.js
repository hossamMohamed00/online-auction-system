import React, { Fragment, useState } from 'react';
// import { useSelector } from "react-redux";

import AuctionDetails from './AuctionDetails';
import Bids from './Bids';

import classes from './ViewCurrentAuction.module.css';

function AucitonHeader({ AuctionData }) {
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownBids, setIsShownBids] = useState(false);

	// const role = useSelector(store => store.AuthData.role);

	const btnDetailsHandeler = () => {
		setIsShownDetails(true);
		setIsShownBids(false);
	};

	const btnBidsHandeler = () => {
		setIsShownDetails(false);
		setIsShownBids(true);
	};

	console.log(AuctionData);
	return (
		<Fragment>
			<h1 className="pt-5 pb-2"> {AuctionData && AuctionData.item.name} </h1>
			<div className={classes.AuctionHeader}>
				<button
					className={`btn ${isShownDetails ? classes.ActiveLink : ''}`}
					onClick={btnDetailsHandeler}
				>
					{' '}
					Details{' '}
				</button>
				{AuctionData && AuctionData.status === 'ongoing' && (
					<button
						className={`btn ${isShownBids ? classes.ActiveLink : ''}`}
						onClick={btnBidsHandeler}
					>
						Bids
					</button>
				)}
			</div>
			{isShownDetails && <AuctionDetails data={AuctionData} />}
			{isShownBids && <Bids />}
		</Fragment>
	);
}

export default AucitonHeader;
