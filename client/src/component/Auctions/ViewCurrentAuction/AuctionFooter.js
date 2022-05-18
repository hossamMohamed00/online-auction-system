import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BiddingModal from './BiddingForm/BiddingModal';

import classes from './ViewCurrentAuction.module.css';

function AuctionFooter({ AuctionStatus }) {
	const location = useLocation();

	const AuctionId = new URLSearchParams(location.search).get('id');

	const [modalShow, setModalShow] = useState(false);

	const UpcomingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const role = useSelector(store => store.AuthData.role);
	const accessToken = useSelector(store => store.AuthData.idToken);
	const url = 'http://localhost:8000';

	console.log(role);
	console.log(AuctionStatus);
	const approveHandler = () => {
		fetch(`${url}/admin/auction/approve/${AuctionId}`, {
			method:'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'content-type': 'application/json',
			},
		}).then(res => {
			if(!res.ok){
				console.log('failed')
			}
		}

		);
	};

	return (
		<>
			{role === 'buyer' && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					{OnGoingStatus && 'Place on Bid'}
					{UpcomingStatus && 'Notify me when Auction be onGoing'}
				</button>
			)}
			{role === 'admin' && AuctionStatus === 'pending' && (
				<div className="d-flex justify-content-evenly mt-3">
					<button
						className={`btn w-100 fw-bold btn-success`}
						type="button"
						onClick={approveHandler}
					>
						Approve
					</button>
					<button
						className={`btn w-100 mx-2 fw-bold ${classes.btnReject}`}
						type="button"
					>
						Reject
					</button>
				</div>
			)}

			<BiddingModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				UpcomingAuction={UpcomingStatus}
			/>
		</>
	);
}

export default AuctionFooter;
