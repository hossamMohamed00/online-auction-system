import React, { Fragment, useState } from "react";

import AuctionDetails from "./AuctionDetails";
import Bids from "./Bids";

import classes from './ViewCurrentAuction.module.css'

function AucitonHeader(props) {
	const [isShownDetails , setIsShownDetails] 	= useState(true)
	const [isShownBids , setIsShownBids] 				= useState(false)

	const btnDetailsHandeler = () => {
		setIsShownDetails(true)
		setIsShownBids(false)
	}

	const btnBidsHandeler = () => {
		setIsShownDetails(false)
		setIsShownBids(true)
	}

	return (
		<Fragment>
			<h1 className='pt-5 pb-2'> Labtop </h1>
			<div className={classes.AuctionHeader}>
				<button className={`btn ${isShownDetails ? classes.ActiveLink : ''}` } onClick={btnDetailsHandeler}> Details </button>
				<button className={`btn ${isShownBids ? classes.ActiveLink : ''}` } onClick={btnBidsHandeler} >
					Bids
				</button>
			</div>
			{isShownDetails && <AuctionDetails AuctionId = {props.AuctionId} />}
			{isShownBids && <Bids/> }
		</Fragment>
	);
}

export default AucitonHeader;