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
import { CheckIfAuctionSaved, joinAuctionApi } from '../../../Api/BuyerApi';

function AuctionFooter({ AuctionStatus , sellerEmail, RejectionMessage , showBids , socket ,  setBidderJoin , setBidderIsBid , MinimumBidAllowed , BiddingAmount , AuctionEndMessage }) {

	const location = useLocation();
	const navigate = useNavigate();
	const AuctionId = new URLSearchParams(location.search).get('id');
	const accessToken = useSelector(store => store.AuthData.idToken);

	const [modalShow, setModalShow] = useState(false);
	const [btnSavedValue, setBtnSavedValue] = useState('Save Auction');

	const [auctionDenied, setAuctionDenied] = useState(false);
	const [RetreatModalTitle , setRetreatModalTitle] = useState('');
	const [IsBidding , setIsBidding] = useState('');

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

	// start check if upcoming auction saved or not
	const { sendRequest : sendRequestForSavedAuction , status:statusForSavedAuction , error:errorForSavedAuction } = useHttp(CheckIfAuctionSaved);

	useEffect(()=>{
		const idToken = accessToken
		const id = AuctionId
		sendRequestForSavedAuction({idToken , id})
	},[sendRequestForSavedAuction])

	useEffect(()=>{
		if(statusForSavedAuction === 'completed'){
			setBtnSavedValue('Saved')
		}
	},[statusForSavedAuction])

	useEffect(()=>{
		if(statusForSavedAuction === 'error'){
			setBtnSavedValue('Save Auction')
			toast.error(errorForSavedAuction)
		}
	},[statusForSavedAuction])

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

	const role = useSelector(store => store.AuthData.role);
	const url = 'http://localhost:8000';
	const email = useSelector(store => store.AuthData.email);

	useEffect(() => {
		if (status === 'completed') {
			sendRequest({ AuctionId: AuctionId, idToken: accessToken });
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
		setBidderIsBid(false)

		// start send request to join auction
		if(OnGoingStatus && !isJoined && accessToken){
			console.log('join auction')
			const idToken = accessToken
			const id = AuctionId
			sendRequestForJoinAuction({ idToken, id})
		}
		// start to place bid
		else if(isJoined && OnGoingStatus){
			setBidderIsBid(true)
			setModalShow(true)
		}
		else{
			setModalShow(true);
		}
	}

	const LeaveAuctionHandler = () => {
		setModalShow(true)
		setRetreatModalTitle('Are You Sure You Want To RetreatFrom This Auction ? ')
	}

	const RetreatModelHandler = () => {
		console.log('retreat')
		socket.emit('retreat-auction' , {
			auctionId : AuctionId
		})
		socket.on('exception' , (data) => {
			console.log(data)
		})
		// setRetreatModalTitle('')

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
		// view exception error in modal
		socket.on('exception', data => {
			setIsExistErrorWhenJoinAuction(data.message)
			setModalShow(true)
			const time = setTimeout(()=>{
				setIsExistErrorWhenJoinAuction('')
				if(modalShow){
					setModalShow(false)
				}
			},[2000])
			return () => time.clearTimeOut()
		})
		setModalShow(false)
	}

	// start new Bid Listener
	useEffect(()=>{
		if(socket){
			socket.on('new-bid', data_ => {
				toast.success("new Bid is Adding Successfully ❤️‍🔥 ")
		})
		}
	},[socket])
	// end new Bid Listener


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
			{role === 'buyer' && OnGoingStatus && !AuctionEndMessage && (
				<div className= {`${isJoined ? 'd-flex justify-content-around mt-3' : 'd-block' } `}>
					<button
						className={`btn fw-bold  fs-5  ${classes.btnPlaceBid_} ${!isJoined  ? classes.btnJoinActive : ''}`}
						type="button"
						onClick={() => joinAuctionHandler(OnGoingStatus)}
						>
							{OnGoingStatus && isJoined  ? 'Place a Bid' :  'Join Auction'  }
					</button>
					{/* leave auction */}
					{
						isJoined &&
							<button
							className={`btn fw-bold text-light  fs-5   ${classes.btnLeaveBid} ${isJoined && OnGoingStatus && 'bg-danger'}`}
							type="button"
							onClick={LeaveAuctionHandler}
							>
								Leave Auction
							</button>
					}

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
				{UpComingStatus && btnSavedValue }
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

				// start RetreatModal
				RetreatModalTitle = {RetreatModalTitle}
				RetreatModelHandler = {RetreatModelHandler}
				// end RetreatModal


				// end bidding

			/>
		</>
	);
}

export default AuctionFooter;
