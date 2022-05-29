import React, { Fragment, useState } from 'react';
// import { useSelector } from "react-redux";

import AuctionDetails from './AuctionDetails';
import Bids from './Bids';

import classes from './ViewCurrentAuction.module.css';

<<<<<<< HEAD
function AuctionHeader({ AuctionData }) {
=======
function AucitonHeader({ AuctionData }) {
>>>>>>> main
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownBids, setIsShownBids] = useState(false);

	// const role = useSelector(store => store.AuthData.role);

<<<<<<< HEAD
	const btnDetailsHandler = () => {
=======
	const btnDetailsHandeler = () => {
>>>>>>> main
		setIsShownDetails(true);
		setIsShownBids(false);
	};

<<<<<<< HEAD
	const btnBidsHandler = () => {
=======
	const btnBidsHandeler = () => {
>>>>>>> main
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
<<<<<<< HEAD
					onClick={btnDetailsHandler}
=======
					onClick={btnDetailsHandeler}
>>>>>>> main
				>
					{' '}
					Details{' '}
				</button>
				{AuctionData && AuctionData.status === 'ongoing' && (
					<button
						className={`btn ${isShownBids ? classes.ActiveLink : ''}`}
<<<<<<< HEAD
						onClick={btnBidsHandler}
=======
						onClick={btnBidsHandeler}
>>>>>>> main
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

<<<<<<< HEAD
export default AuctionHeader;
=======
export default AucitonHeader;
>>>>>>> main
