import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getSingleAuction } from '../../../Api/Admin';
import { DeleteAuctionHandler } from '../../../Api/AuctionsApi';
import ModalUi from './BiddingForm/Modal';
import useHttp from '../../../CustomHooks/useHttp';

import classes from './ViewCurrentAuction.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuctionFooter({ AuctionStatus, sellerEmail, RejectionMessage }) {
	const location = useLocation();
	const navigate = useNavigate();
	const AuctionId = new URLSearchParams(location.search).get('id');

	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('Save Auction');

	const [auctionDenied, setAuctionDenied] = useState(false);

	const UpComingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const PendingStatus = AuctionStatus === 'pending';
	const DeniedStatus = AuctionStatus === 'denied';

	// const SavedAuctionStatus = AuctionStatus === 'saved';

	// handle Rejection
	const { data, sendRequest, status } = useHttp(getSingleAuction);
	// handle delete
	const {
		data: dataForDelete,
		sendRequest: sendRequestForDelete,
		status: statusForDelete,
		error: errorForDelete,
	} = useHttp(DeleteAuctionHandler);

	const role = useSelector(store => store.AuthData.role);
	const accessToken = useSelector(store => store.AuthData.idToken);
	const url = 'http://localhost:8000';
	const email = useSelector(store => store.AuthData.email);
	console.log(email + ' ' + sellerEmail);

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
			}
			setModalShow(false);
		});
	};

	// ! to be handled
	const DeleteAuction = AuctionId => {
		sendRequestForDelete({ AuctionId: AuctionId, accessToken });

		if (statusForDelete === 'completed') {
			setModalShow(false);

			toast.success('Auction Deleted Successfully');
		} else if (statusForDelete === 'error') {
			setModalShow(false);
			toast.error(errorForDelete);
		}
	};

	return (
		<>
			<ToastContainer theme="dark" />

			{role === 'seller' && DeniedStatus && (
				<div className=" bg-warning mt-3 p-3">
					<h5 className=" text-black fw-bold">
						Rejected because : {RejectionMessage}
					</h5>
				</div>
			)}
			{role === 'buyer' && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
					disabled={btnSavedValue === 'saved'}
				>
					{OnGoingStatus && 'Place on Bid'}
					{UpComingStatus && btnSavedValue}
				</button>
			)}

			{(role === 'admin' || role === 'employee') &&
				AuctionStatus === 'pending' && (
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

			{(role === 'admin' || role === 'employee') &&
				AuctionStatus === 'ongoing' && (
					<button
						className={`btn w-100 mx-2 fw-bold ${classes.btnExtend}`}
						type="button"
						onClick={() => setModalShow(true)}
					>
						Extend Auction Time
					</button>
				)}
			{/* to be added here && sellerEmail === email */}
			{role === 'seller' && (
				<div className="d-flex justify-content-evenly mt-3">
					<button
						className={`btn w-100 fw-bold btn-success text-light`}
						type="button"
					>
						<Link
							to={`/seller-dashboard/UpdateAuction?id=${AuctionId}`}
							className="text-light text-decoration-none"
						>
							Update
						</Link>
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
				btnReject={PendingStatus}
				rejectHandler={rejectHandler}
				btnSaved={btnSaved}
				SavedAuctionId={AuctionId}
				btnRemove={() => DeleteAuction(AuctionId)}
			/>
		</>
	);
}

export default AuctionFooter;
