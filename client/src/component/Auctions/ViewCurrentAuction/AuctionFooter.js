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
import { CheckIfAuctionSaved, joinAuctionApi } from '../../../Api/BuyerApi';

function AuctionFooter({
	AuctionStatus,
	sellerEmail,
	RejectionMessage,
	showBids,
	socket,
	setBidderJoin,
	setBidderIsBid,
	MinimumBidAllowed,
	chairCost,
	AuctionEndMessage,
}) {
	const location = useLocation();
	const navigate = useNavigate();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const accessToken = useSelector(store => store.AuthData.idToken);

	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('Save Auction');
	const [RetreatModalTitle, setRetreatModalTitle] = useState('');


	const role = useSelector(store => store.AuthData.role);
	const url = 'http://localhost:8000';
	const email = useSelector(store => store.AuthData.email);

	// set true when bidder is joined in auction
	const [isJoined, setIsJoined] = useState(
		localStorage.getItem('BidderIsJoined'),
	);
	// confirmation join auction
	const [ConfirmJoin, setConfirmJoin] = useState('');
	const [BidNow, setBidsNow] = useState(false);

	const [
		isExistErrorWhenJoinAuction,
		setIsExistErrorWhenJoinAuction,
	] = useState(false);

	// extend Auction Time In Seller
	const [ExtendAuctionId, setExtendAuctionId] = useState('');

	const UpComingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const PendingStatus = AuctionStatus === 'pending';
	const DeniedStatus = AuctionStatus === 'denied';

	// handle Rejection
	const { sendRequest, status } = useHttp(getSingleAuction);
	const {
		sendRequest: sendRequestForJoinAuction,
		status: statusForJoinAuction,
		data: dataForJoinAuction,
		error: errorForJoinAuction,
	} = useHttp(joinAuctionApi);

	// start save auction api
	const {
		sendRequest: sendRequestForIfSavedAuction,
		status: statusForIfSavedAuction
	} = useHttp(CheckIfAuctionSaved);

	useEffect(() => {
		if (UpComingStatus && role === 'buyer' && AuctionId) {
			const idToken = accessToken;
			const id = AuctionId;
			sendRequestForIfSavedAuction({ idToken, id });
		}
	}, [sendRequestForIfSavedAuction, UpComingStatus, role, AuctionId]);

	useEffect(() => {
		if (statusForIfSavedAuction === 'completed') {
			setBtnSavedValue('Saved');
		}
	}, [statusForIfSavedAuction]);

	useEffect(() => {
		if (statusForIfSavedAuction === 'error') {
			setBtnSavedValue('Save Auction');
		}
	}, [statusForIfSavedAuction]);

	const btnSaved = btnSavedValue => {
		setBtnSavedValue(btnSavedValue);
	};

	// end check if upcoming auction saved or not

	// handle delete
	const {
		sendRequest: sendRequestForDelete,
		status: statusForDelete,
		error: errorForDelete,
	} = useHttp(DeleteAuctionHandler);


	useEffect(() => {
		if (status === 'completed') {
			sendRequest({ AuctionId: AuctionId, idToken: accessToken });
			window.reload();
		}
	}, [sendRequest]);

	const approveHandler = () => {
		fetch(`${url}/admin/auction/approve/${AuctionId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'content-type': 'application/json',
			},
		}).then(res => {
			if (!res.ok) {
			} else {
				toast.success('Approved Successfully');
				navigate('/');
			}
		});
	};

	const rejectHandler = async (rejectMassage) => {
		const rejectionMessage = { message: rejectMassage };
		const response = await fetch(`${url}/admin/auction/reject/${AuctionId}`, {
			method: 'POST',
			body: JSON.stringify(rejectionMessage),
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'content-type': 'application/json',
			},
		})
			const data = await response.json()
			if (!response.ok || data.success === false) {
				toast.error(data.message)
			}
			else{
				toast.success(data.message)
				const timer = setTimeout(()=>{
					window.location.reload()
				},3000)
				return ()=> clearTimeout(timer)
			}

			setModalShow(false);
		}


	// start join auction handler
	const joinAuctionHandler = OnGoingStatus => {
		setBidderIsBid(false);
		if (OnGoingStatus && !isJoined && accessToken) {
			setModalShow(true);
			setConfirmJoin(Math.random());
		}
		// start to place bid
		if (isJoined && OnGoingStatus) {
			setRetreatModalTitle('');
			setConfirmJoin('');

			setBidderIsBid(true);
			setBidsNow(true);
			setModalShow(true);
		} else {
			setModalShow(true);
		}
	};

	const LeaveAuctionHandler = () => {
		setBidsNow(false);
		setModalShow(true);
		setRetreatModalTitle(
			'Are You Sure You Want To RetreatFrom This Auction ? ',
		);
	};

	const RetreatModelHandler = () => {
		socket.emit('leave-auction', {
			auctionId: AuctionId,
		});
		localStorage.removeItem('BidderIsJoined');
		setIsJoined(false);

		socket.on('exception', data => {
			localStorage.setItem('BidderIsJoined', true);
			setIsJoined(true);

			setIsExistErrorWhenJoinAuction(data.message);
			setModalShow(true);
			const time = setTimeout(() => {
				setIsExistErrorWhenJoinAuction('');
				if (modalShow) {
					setModalShow(false);
				}
			}, [5000]);
			return () => time.clearTimeOut();
		});
		setModalShow(false);
		setRetreatModalTitle('');
	};

	useEffect(() => {
		if (statusForJoinAuction === 'completed') {
			if (role === 'buyer') {
				setConfirmJoin('');
				setModalShow(false);
				toast.success(dataForJoinAuction.message);
				localStorage.setItem('BidderIsJoined', dataForJoinAuction.success);

				setIsJoined(localStorage.getItem('BidderIsJoined'));
				showBids(Math.random());
			} else {
				localStorage.removeItem('BidderIsJoined');
				setIsJoined(false);
			}
		}
		if (statusForJoinAuction === 'error') {
			toast.error(errorForJoinAuction);
			localStorage.removeItem('BidderIsJoined');
			setIsJoined(false);
		}
	}, [statusForJoinAuction]);

	// if bidder accept block money from your wallet
	const btnConfirmationHandler = () => {
		// start send request to join auction
		const idToken = accessToken;
		const id = AuctionId;
		sendRequestForJoinAuction({ idToken, id });
	};

	useEffect(() => {
		if (isJoined && role === 'buyer' && !UpComingStatus) {
			showBids(Math.random());
			setBidderJoin(Math.random());
		}
	}, [isJoined]);

	useEffect(() => {
		if (isJoined) {
			showBids(Math.random());
			setBidderJoin(Math.random());
		}
	}, [isJoined]);

	// start get bidding amount from modal and send to bid
	const btnBiddingHandler = value => {
		socket.emit('place-bid', {
			auctionId: AuctionId,
			bidValue: value,
		});
		// view exception error in modal
		socket.on('exception', data => {
			setIsExistErrorWhenJoinAuction(data.message);
			setModalShow(true);
			const time = setTimeout(() => {
				setIsExistErrorWhenJoinAuction('');
				if (modalShow) {
					setModalShow(false);
				}
			}, [2000]);
			return () => time.clearTimeOut();
		});
		setModalShow(false);
	};

	// start new Bid Listener
	useEffect(() => {
		if (socket) {
			socket.on('new-bid', data_ => {
				toast.success('new Bid is Adding Successfully ❤️‍🔥 ');
			});
		}
	}, [socket]);
	// end new Bid Listener
	// end join auction handler

	//  ************************  end Bidding Handler ****************************
	// start seller Handler
	// ! to be handled
	const DeleteAuction = AuctionId => {
		sendRequestForDelete({ AuctionId: AuctionId, accessToken });

		if (statusForDelete === 'completed') {
			setModalShow(false);

			toast.success('Auction Deleted Successfully');
			setTimeout(() => {
				navigate('/');
			}, 1000);
		} else if (statusForDelete === 'error') {
			setModalShow(false);
			toast.error(errorForDelete);
		}
	};

	const ExtendAuctionTimeModalHandler = AuctionId => {
		setExtendAuctionId(AuctionId);
		setModalShow(true);
	};

	return (
		<>
			<ToastContainer theme="dark" />

			{/* start buyer */}
			{/* start when auction ongoing */}
			{role === 'buyer' && OnGoingStatus && !AuctionEndMessage && (
				<div
					className={`${
						isJoined ? 'd-flex justify-content-around mt-3' : 'd-block'
					} `}
				>
					<button
						className={`btn fw-bold  fs-5  ${classes.btnPlaceBid_} ${
							!isJoined ? classes.btnJoinActive : ''
						}`}
						type="button"
						onClick={() => joinAuctionHandler(OnGoingStatus)}
					>
						{OnGoingStatus && isJoined ? 'Place a Bid' : 'Join Auction'}
					</button>
					{/* leave auction */}
					{isJoined && (
						<button
							className={`btn fw-bold text-light  fs-5   ${
								classes.btnLeaveBid
							} ${isJoined && OnGoingStatus && 'bg-danger'}`}
							type="button"
							onClick={LeaveAuctionHandler}
						>
							Leave Auction
						</button>
					)}
				</div>
			)}
			{/* start when auction upcoming */}
			{role === 'buyer' && UpComingStatus && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
					disabled={btnSavedValue === 'Saved'}
				>
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
							onClick={() => setModalShow(true) }
						>
							Reject
						</button>
					</div>
				)}

			{/* ******************** start seller Actions ******************** */}
			{/*  start update Auction  */}
			{(role === 'seller' && email === sellerEmail && !OnGoingStatus )&& (
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
			{/*  end update Auction  */}

			{/*  start denied Auction  */}
			{role === 'seller' && DeniedStatus && (
				<div className=" bg-warning mt-3 p-3">
					<h5 className=" text-black fw-bold">
						Rejected because : {RejectionMessage}
					</h5>
				</div>
			)}
			{/* start extend auction time */}
			{/*  */}
			{role === 'seller' &&
				!AuctionEndMessage &&
				!UpComingStatus &&
				OnGoingStatus && (
					<div className="d-flex justify-content-evenly mt-3">
						<button
							className={`btn w-100 mx-2 fw-bold ${classes.btnReject}`}
							type="button"
							onClick={() => ExtendAuctionTimeModalHandler(AuctionId)}
						>
							Extend Auction Time
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
				btnExtendAuction={ExtendAuctionId}

				// *********** start bidding ************ //

				// start join Auction
				btnBiddingHandler={value => btnBiddingHandler(value)}
				BidNow={BidNow}
				// if bidder accept block money from your wallet
				btnConfirmationHandler={btnConfirmationHandler}
				ConfirmJoin={
					ConfirmJoin &&
					`We Will Block this Chair Cost ${chairCost} from Your Balance`
				}
				// end join Auction

				errorWhenJoinAuction={
					isExistErrorWhenJoinAuction && isExistErrorWhenJoinAuction
				}
				MinimumBidAllowed={MinimumBidAllowed}
				chairCost={chairCost}
				// start RetreatModal
				RetreatModalTitle={RetreatModalTitle}
				RetreatModelHandler={RetreatModelHandler}
				// end RetreatModal

				// *********** end bidding ************ //
			/>
		</>
	);
}

export default AuctionFooter;
