import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalUi from './BiddingForm/Modal';

import classes from './ViewCurrentAuction.module.css';

function AuctionFooter({AuctionStatus}) {
	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('');


	const UpComingStatus = AuctionStatus === 'upcoming'
	const OnGoingStatus = AuctionStatus === 'ongoing'
	const DeniedStatus = AuctionStatus === 'denied'
	// const SavedStatus = AuctionStatus === 'saved'


	const role = useSelector(store => store.AuthData.role);

	const btnSaved = (btnSavedValue) => {
		setBtnSavedValue(btnSavedValue)
	}

	console.log(role)
	console.log(AuctionStatus)

	return (
		<>
			{role === 'buyer' && (

				<button className={`btn w-100 fw-bold ${classes.btnPlaceBid}`} type="button" onClick={()=> setModalShow(true)}>
					{OnGoingStatus && "Place on Bid" }
					{UpComingStatus && btnSavedValue ? btnSavedValue : "Notify me" }
				</button>

			)}
			{role === 'admin' && AuctionStatus==='pending' && (
				<div className='d-flex justify-content-evenly mt-3'>
				<button
					className={`btn w-100 fw-bold btn-success`}
					type="button"
				>
				Approve

				</button>
				<button
					className={`btn w-100 mx-2 fw-bold ${classes.btnReject}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					Reject

				</button>
				</div>
			)}

			<ModalUi
      	show						= {modalShow}
     	 	onHide					= {() => setModalShow(false)}
				UpComingAuction = {UpComingStatus}
				btnReject 			= {DeniedStatus}
				btnSaved 				= {btnSaved}
				// SavedStatus 		= {SavedStatus}
    	/>

		</>

	);
}

export default AuctionFooter;
