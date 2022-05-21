import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalUi from './BiddingForm/Modal';

import classes from './ViewCurrentAuction.module.css';

function AuctionFooter({ AuctionStatus, sellerEmail }) {
	const [modalShow, setModalShow] = useState(false);

	const UpComingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const DeniedStatus = AuctionStatus === 'denied';

	const role = useSelector(store => store.AuthData.role);
	const email = useSelector(store => store.AuthData.email);

	console.log(role, email, sellerEmail);
	console.log(AuctionStatus);

	return (
		<>
			{role === 'buyer' && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					{OnGoingStatus && 'Place on Bid'}
					{UpComingStatus && 'Notify me'}
				</button>
			)}
			{role === 'admin' && AuctionStatus === 'pending' && (
				<div className="d-flex justify-content-evenly mt-3">
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
						onClick={() => setModalShow(true)}
					>
						Reject
					</button>
				</div>
			)}

			{role === 'seller' && sellerEmail === email && (
				<div className="d-flex justify-content-evenly mt-3">
					<button
						className={`btn w-100 fw-bold btn-success`}
						type="button"
						// onClick={() => setModalShow(true)}
					>
						Update
					</button>
					<button
						className={`btn w-100 mx-2 fw-bold ${classes.btnReject}`}
						type="button"
						onClick={() => setModalShow(true)}
					>
						delete
					</button>
				</div>
			)}

			<ModalUi
				show={modalShow}
				onHide={() => setModalShow(false)}
				UpComingAuction={UpComingStatus}
				btnReject={DeniedStatus}
			/>
		</>
	);
}

export default AuctionFooter;
