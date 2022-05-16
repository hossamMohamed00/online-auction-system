import React, { useState } from 'react';
import BiddingModal from './BiddingForm/BiddingModal';


import classes from './ViewCurrentAuction.module.css'


function AuctionFooter({AuctionStatus}) {
	const [modalShow, setModalShow] = useState(false);

	const UpgoingStatus = AuctionStatus === 'upcoming'
	const OnGoingStatus = AuctionStatus === 'ongoing'

	console.log(AuctionStatus)
	return (
		<>
		<button className={`btn w-100 fw-bold ${classes.btnPlaceBid}`} type="button" onClick={()=> setModalShow(true)}>
			{OnGoingStatus && "Place on Bid" }
			{UpgoingStatus && "Notify me when Auction be onGoing" }
		</button>

		<BiddingModal
      show={modalShow}
      onHide={() => setModalShow(false)}
			UpgoingAuction = {UpgoingStatus}
    />
		</>

	);
}

export default AuctionFooter;