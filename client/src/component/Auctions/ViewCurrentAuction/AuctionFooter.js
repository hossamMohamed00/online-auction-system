import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BiddingModal from './BiddingForm/BiddingModal';

import classes from './ViewCurrentAuction.module.css';

function AuctionFooter({AuctionStatus}) {
	const [modalShow, setModalShow] = useState(false);

	const UpgoingStatus = AuctionStatus === 'upcoming'
	const OnGoingStatus = AuctionStatus === 'ongoing'
	const role = useSelector(store => store.AuthData.role);

	console.log(role)
	console.log(AuctionStatus)

	return (
		<>
			{role === 'buyer' && (

				<button className={`btn w-100 fw-bold ${classes.btnPlaceBid}`} type="button" onClick={()=> setModalShow(true)}>
					{OnGoingStatus && "Place on Bid" }
					{UpgoingStatus && "Notify me when Auction be onGoing" }
				</button>

			)}
			{role === 'admin' && AuctionStatus==='pending' && (
				<div className='d-flex justify-content-evenly mt-3'>
				<button
					className={`btn w-100 fw-bold btn-success`}
					type="button"
					// onClick={() => setModalShow(true)}
				>
					Approve

				</button>
				<button
					className={`btn w-100 mx-2 fw-bold ${classes.btnReject}`}
					type="button"
					// onClick={() => setModalShow(true)}
				>
					Reject

				</button>
				</div>
			)}

			<BiddingModal
      	show={modalShow}
     	 	onHide={() => setModalShow(false)}
				UpgoingAuction = {UpgoingStatus}
    	/>

		</>

	);
}

export default AuctionFooter;
