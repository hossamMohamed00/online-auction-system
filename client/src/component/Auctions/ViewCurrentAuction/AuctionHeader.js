import React, { useState } from "react";

import AuctionDetails from "./AuctionDetails";
import Bidders from "./Bidders";
import Bids from "./Bids";

import classes from './ViewCurrentAuction.module.css'

function AucitonHeader() {
	const [isShownDetails , setIsShownDetails] 	= useState(true)
	const [isShownBids , setIsShownBids] 				= useState(false)
	const [isShownBidders , setIsShownBidders]	= useState(false)

	const btnDetailsHandeler = () => {
		setIsShownDetails(true)
		setIsShownBids(false)
		setIsShownBidders(false)
	}

	const btnBidsHandeler = () => {
		setIsShownDetails(false)
		setIsShownBids(true)
		setIsShownBidders(false)
	}
	const btnBiddersHandeler = () => {
		setIsShownDetails(false)
		setIsShownBids(false)
		setIsShownBidders(true)
	}
	return (
		<React.Fragment>
			<h1 className='py-4'> Labtop </h1>
			<div className={classes.AuctionHeader}>
				<button className={`btn ${isShownDetails ? classes.ActiveLink : ''}` } onClick={btnDetailsHandeler}> Details </button>
				<button className={`btn ${isShownBids ? classes.ActiveLink : ''}` } onClick={btnBidsHandeler} >Bids</button>
				<button className={`btn ${isShownBidders ? classes.ActiveLink : ''}` } onClick={btnBiddersHandeler} >Bidders</button>
			</div>
			{isShownDetails && <AuctionDetails/>}
			{isShownBids && <Bids/> }
			{isShownBidders && <Bidders/>}

		</React.Fragment>
	);
}

export default AucitonHeader;