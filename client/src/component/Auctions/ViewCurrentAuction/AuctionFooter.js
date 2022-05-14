import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BiddingModal from './BiddingForm/BiddingModal';

import classes from './ViewCurrentAuction.module.css';

function AuctionFooter() {
	const [modalShow, setModalShow] = useState(false);

	const role = useSelector(store => store.AuthData.role);

	return (
		<>
			{role === 'buyer' && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					Place on Bid
				</button>
			)}
			{role === 'admin' && (
				<div className='d-flex justify-content-evenly'>
				<button
					className={`btn w-100 fw-bold btn-success`}
					type="button"
					// onClick={() => setModalShow(true)}
				>
					Approve

				</button>
				<button
					className={`btn w-100 fw-bold btn-danger`}
					type="button"
					// onClick={() => setModalShow(true)}
				>
					Reject

				</button>
				</div>
			)}

			<BiddingModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}

export default AuctionFooter;
