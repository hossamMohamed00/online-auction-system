import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSingleAuction } from '../../../Api/Admin';
import { DeleteAuctionHandler } from '../../../Api/AuctionsApi';
import ModalUi from './BiddingForm/Modal';
import useHttp from '../../../CustomHooks/useHttp';

import classes from './ViewCurrentAuction.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { joinAuctionApi } from '../../../Api/BuyerApi';

function AuctionFooter({ AuctionStatus , sellerEmail, RejectionMessage , showBids , socket ,  setBidderJoin , setBidderIsBid , MinimumBidAllowed , BiddingAmount , AuctionEndMessage }) {

	const location = useLocation();
	const navigate = useNavigate();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const accessToken = useSelector(store => store.AuthData.idToken);

	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('Save Auction');

	const [auctionDenied, setAuctionDenied] = useState(false);

	// set true when bidder is joined in auction
	const [isJoined , setIsJoined] = useState(localStorage.getItem('BidderIsJoined'))
	const [isExistErrorWhenJoinAuction , setIsExistErrorWhenJoinAuction] = useState(false)

	const UpComingStatus = AuctionStatus === 'upcoming';
	const OnGoingStatus = AuctionStatus === 'ongoing';
	const PendingStatus = AuctionStatus === 'pending';
	const DeniedStatus = AuctionStatus === 'denied';

	// handle Rejection
	const { data, sendRequest, status } = useHttp(getSingleAuction);

	const { sendRequest : sendRequestForJoinAuction , status:statusForJoinAuction , data:dataForJoinAuction , error:errorForJoinAuction } = useHttp(joinAuctionApi);
	// const SavedAuctionStatus = AuctionStatus === 'saved';

	console.log(UpComingStatus);
	// handle delete
	const {
		data: dataForDelete,
		sendRequest: sendRequestForDelete,
		status: statusForDelete,
		error: errorForDelete,
	} = useHttp(DeleteAuctionHandler);

	const role = useSelector(store => store.AuthData.role);
	const url = 'http://localhost:8000';
	const email = useSelector(store => store.AuthData.email);

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


	// start join auction handler
	const joinAuctionHandler = (OnGoingStatus) =>{

		// start send request to join auction
		if(OnGoingStatus && !isJoined && accessToken){
			console.log('join auction')
			const idToken = accessToken
			const id = AuctionId
			sendRequestForJoinAuction({ idToken, id})
		}
		// start to place bid
		else if(isJoined && OnGoingStatus){
			setBidderIsBid(Math.random())
			setModalShow(true)
		}
		else{
			setModalShow(true);
		}
	}
	useEffect(()=>{
		if(statusForJoinAuction === 'completed'){
			toast.success(dataForJoinAuction.message)
			localStorage.setItem('BidderIsJoined' , dataForJoinAuction.success)

			setIsJoined(localStorage.getItem('BidderIsJoined'))
			showBids(Math.random())
		}
		if(statusForJoinAuction === 'error'){
			toast.error(errorForJoinAuction)
		}
	},[statusForJoinAuction])

	useEffect(()=> {
		if(isJoined){
			showBids(Math.random())
			setBidderJoin(Math.random())
		}

	},[isJoined])


	// start get bidding amount from modal and send to bid
	const btnBiddingHandler = (value) => {

		socket.emit('place-bid', {
			auctionId : AuctionId,
			bidValue : value
		})

		BiddingAmount(value)
		// view exception error in modal
		socket.on('exception', data => {
			setIsExistErrorWhenJoinAuction(data.message)
			setModalShow(true)
		})
		setModalShow(false)

	}

	// end join auction handler
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
			{role === 'seller' && (
				<div className="d-flex justify-content-evenly mt-3">
					<button
						className={`btn w-100 fw-bold btn-success`}
						type="button"
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
			{/* start when auction ongoing */}
			{role === 'buyer' && OnGoingStatus && !AuctionEndMessage &&(

				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid} ${!isJoined && OnGoingStatus && 'bg-danger'}`}
					type="button"
					onClick={() => joinAuctionHandler(OnGoingStatus)}
				>
					{OnGoingStatus && isJoined  ? 'Place a Bid' :  'Join Auction'  }
				</button>
			)}
			{/* start when auction upcoming */}
			{role === 'buyer' && UpComingStatus && (
				<button
					className={`btn w-100 fw-bold ${classes.btnPlaceBid}`}
					type="button"
					onClick={() => setModalShow(true)}
					disabled={btnSavedValue === 'saved'}
				>
				{UpComingStatus && btnSavedValue }
				</button>
			)}

			{/* ******************** start Admin Actions ******************** */}
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

			{/* ******************** start seller Actions ******************** */}
			{/*  start update Auction  */}
			{role === 'seller' && sellerEmail === email && (
				<div className="d-flex justify-content-evenly mt-3">
					<button
						className={`btn w-100 fw-bold btn-success`}
						type="button"
						//	onClick={() => setModalShow(true)}
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
			{/*  end update Auction  */}

			{/*  start denied Auction  */}
			{role === 'seller' && DeniedStatus && (
				<div className=" bg-warning mt-3 p-3">
					<h5 className=" text-black fw-bold">
						Rejected because : {RejectionMessage}
					</h5>
				</div>
			)}
			{/*  end denied Auction  */}


			<ModalUi
				show={modalShow}
				onHide={() => setModalShow(false)}
				UpComingAuction={UpComingStatus}
				btnReject={PendingStatus}
				rejectHandler={rejectHandler}
				btnRemove={() => DeleteAuction(AuctionId)}
				btnSaved={btnSaved}
				SavedAuctionId	= {AuctionId}

				// start bidding
				btnBiddingHandler = {(value)=> btnBiddingHandler(value)}
				errorWhenJoinAuction = {isExistErrorWhenJoinAuction && isExistErrorWhenJoinAuction}
				MinimumBidAllowed = {MinimumBidAllowed}
				// end bidding

			/>
		</>
	);
}

export default AuctionFooter;
