import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSingleAuction } from '../../../Api/Admin';
import ModalUi from './BiddingForm/Modal';
import useHttp from '../../../CustomHooks/useHttp';

import classes from './ViewCurrentAuction.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<<<<<<< HEAD
function AuctionFooter({ AuctionStatus, sellerEmail }) {
=======
function AuctionFooter({ AuctionStatus }) {
>>>>>>> main
	const location = useLocation();
const navigate = useNavigate();
	const AuctionId = new URLSearchParams(location.search).get('id');

	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('');

	const [auctionDenied, setAuctionDenied] = useState(false);

	const UpComingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const DeniedStatus = AuctionStatus === 'pending';

	// handle Rejection
	const { data, sendRequest, status } = useHttp(getSingleAuction);
	const role = useSelector(store => store.AuthData.role);
	const accessToken = useSelector(store => store.AuthData.idToken);
	const url = 'http://localhost:8000';
	const email = useSelector(store => store.AuthData.email);

	console.log(role, email, sellerEmail);
	// console.log(AuctionStatus);
	useEffect(() => {
		if (status === 'completed') {
			sendRequest({ AuctionId: AuctionId, idToken: accessToken });
		}
	}, [sendRequest]);

	const btnSaved = btnSavedValue => {
		setBtnSavedValue(btnSavedValue);
	};

	const approveHandler = () => {
		fetch(`${url}/admin/auction/approve/${AuctionId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'content-type': 'application/json',
			},
		}).then(res => {
			if (!res.ok) {
				console.log('failed');
			} else {
				toast.success('Approved Successfully');
				navigate('/');
			}
		});
	};

	const rejectHandler = rejectMassage => {
		const rejectionMessage = { message: rejectMassage };
		fetch(`${url}/admin/auction/reject/${AuctionId}`, {
			method: 'POST',
			body: JSON.stringify(rejectionMessage),
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'content-type': 'application/json',
			},
		}).then(res => {
			if (!res.ok) {
				console.log('failed');
			}
			setModalShow(false);
		});
	};

	return (
		<>
			<ToastContainer theme="dark" />
			{role === 'seller' && (
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
			{role === 'buyer' && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					{OnGoingStatus && 'Place on Bid'}
					{UpComingStatus && btnSavedValue ? btnSavedValue : ''}
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
						onClick={() => (
							<>
								{setModalShow(true)} {setAuctionDenied(true)}
							</>
						)}
					>
						Reject
					</button>
				</div>
			)}

			{role === 'admin' && AuctionStatus === 'ongoing' && (
				<button
					className={`btn w-100 mx-2 fw-bold ${classes.btnExtend}`}
					type="button"
					onClick={() => setModalShow(true)}
				>
					Extend Auction Time
				</button>
			)}

			<ModalUi
				show={modalShow}
				onHide={() => setModalShow(false)}
				UpComingAuction={UpComingStatus}
				btnReject={DeniedStatus}
				rejectHandler={rejectHandler}
				btnSaved={btnSaved}
				// SavedStatus 		= {SavedStatus}
			/>
		</>
	);
}

export default AuctionFooter;
