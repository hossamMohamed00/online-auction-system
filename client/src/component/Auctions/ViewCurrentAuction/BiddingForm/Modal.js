import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getWalletBalance, SaveAuctionApi } from '../../../../Api/BuyerApi';
import useHttp from '../../../../CustomHooks/useHttp';
import classes from './Modal.module.css';

const ModalUi = props => {


	const [BidValue, setBidValue] = useState();
	const [BalanceValue, setBalanceValue] = useState();

	const [isBidValid, setIsBidValid] = useState(true);
	const rejectRef = useRef();
	const AmountRef = useRef()

	const role = useSelector(store => store.AuthData.role);
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	const idToken = useSelector(store => store.AuthData.idToken);


	// start Saved Auction Handler
	const {sendRequest:sendRequestForSaveAuction, status:statusForSaveAuction , data:dataForSaveAuction , error:errorForSaveAuction } = useHttp(SaveAuctionApi);

	const btnSavedHandler = () => {
		const id = props.SavedAuctionId
		sendRequestForSaveAuction({idToken , id})
	};

	useEffect(()=>{
		if(statusForSaveAuction === 'completed'){
			toast.success(dataForSaveAuction.message)
			props.btnSaved('saved')
			props.onHide()
		}
	},[statusForSaveAuction])

	useEffect(()=>{
		if(statusForSaveAuction === 'error'){
			toast.error(errorForSaveAuction)
			props.btnSaved('saved')
			props.onHide()
		}
	},[statusForSaveAuction])

	// end Saved Auction Handler


	// start get balance of bidder
	const {sendRequest:sendRequestForGetBalance, status:statusForGetBalance , data:dataForGetBalance , error:errorForGetBalance } = useHttp(getWalletBalance);
	useEffect(()=>{
		sendRequestForGetBalance(idToken)
	},[sendRequestForGetBalance])

	useEffect(()=>{
		if(statusForGetBalance === 'completed'){
			setBalanceValue(dataForGetBalance.balance)
		}
	},[statusForGetBalance])

	// end get balance of bidder


	const BidValueValidation = e => {
		setBidValue(e.target.value);
		if (e.target.value.trim() < props.MinimumBidAllowed) {
			setIsBidValid(false);
		} else {
			setIsBidValid(true);
		}
	};
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className={classes.BiddingModal}
		>
			{/* Modal Header */}

			<Modal.Header closeButton className={classes.BiddingModalHeader}>
				<Modal.Title id="contained-modal-title-vcenter">
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && !(!!props.errorWhenJoinAuction) &&  !(!!props.RetreatModelTitle) && (
						<h2 className="fw-bold">Place a Bid </h2>
					)}

					{/* start View exception when true to join  */}
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && (!!props.errorWhenJoinAuction) && (
						<h2 className="fw-bold"> {props.errorWhenJoinAuction} </h2>
					)}
					{!isLoggedIn && (
						<h5 className="text-center pt-3">
							Please Login in First, before placing a bid
						</h5>
					)}
					{isLoggedIn && props.UpComingAuction && role === 'buyer' && (
						<h5 className="text-center pt-3">
							We will Notify you when Auction be ongoing
						</h5>
					)}
					{props.btnReject && role === 'admin' && (
						<h5> write a reason for reject</h5>
					)}

					{/* start retreat From Auction */}
					{props.RetreatModalTitle && props.RetreatModelHandler &&
						<h5> {props.RetreatModalTitle} </h5>
					}

					{/* end retreat From Auction */}

				</Modal.Title>
			</Modal.Header>

			{/* Modal Body when user Is loggedIn && Auction status is ongoing  */}
			<Modal.Body className={classes.BiddingModalBody}>
				<>

					{/* start for seller  */}
						{isLoggedIn && role === 'seller' && (
							<h1 className="text-light text-center">
								Are you sure to delete this auction
							</h1>
						)}
					{/* end for seller  */}

					{/* for buyer */}
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && !(!!props.errorWhenJoinAuction)  && !(!!props.RetreatModelTitle) &&(
						<>
							<div
								className={` ${classes['ModalBodyForm']} ${
									!isBidValid ? 'pb-2' : ''
								}`}
							>
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										min={props.MinimumBidAllowed}
										value={BidValue}
										onChange={BidValueValidation}
										ref = {AmountRef}
										placeholder={props.MinimumBidAllowed}
									/>
									<span
										className={` input-group-text ${classes['input-group-text']} `}
									>
										$
									</span>
								</div>
								{!isBidValid && (
									<p className="px-2">
										You must bid at least
										<span className={classes.bidValue}> {props.MinimumBidAllowed} </span>
									</p>
								)}
							</div>

							<div className="pt-4">
								<div className="d-flex justify-content-between">
									<p> Your Balance </p>
									<p> {BalanceValue} </p>
								</div>

								<div className="d-flex justify-content-between">
									<p> Your Balance After Bidding </p>
									<p className={!isBidValid ? classes['Alarm'] : ''} > {BidValue&& BalanceValue &&  (parseInt(BalanceValue)- parseInt(BidValue))  } $ </p>
								</div>
							</div>
						</>
					)}
					{/*for  Admin  */}
					{props.btnReject && role === 'admin' && (
						<input
							type="text"
							placeholder="Type reason here ..."
							className={`${classes.reject} form-control`}
							ref={rejectRef}
						/>
					)}
				</>
			</Modal.Body>

			<Modal.Footer className={classes['HideBorder']}>
				<div className="d-flex gap-2 col-12 mx-auto">

					{/* start user not logged in */}
					{!isLoggedIn && (
						<Link
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							to="/login"
						>
							Login
						</Link>
					)}
					{/* end user not logged in */}

					{/* start buyer modal */}
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && !(!!props.errorWhenJoinAuction) && !(!!props.RetreatModelTitle) && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnPlaceMyBid}`}
							type="button"
							onClick={()=> props && props.btnBiddingHandler(AmountRef.current.value)}
						>
							Place My Bid
						</button>
					)}

					{isLoggedIn && props.RetreatModalTitle && props.RetreatModelHandler && !props.UpComingAuction && !(!!props.errorWhenJoinAuction) &&
						<button onClick={props.RetreatModelHandler} className={`btn col fw-bold bg-light ${classes.btnPlaceMyBid}`}> ConFirm </button>
					}

					{isLoggedIn && props.UpComingAuction && role === 'buyer' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							onClick={btnSavedHandler}
						>
							Save
						</button>
					)}
					{/* end buyer modal */}

					{/* start Admin modal */}
					{props.btnReject && role === 'admin' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							onClick={() => props.rejectHandler(rejectRef.current.value)}
						>
							Submit
						</button>
					)}
					{/* start Admin modal */}

					{/* start seller modal */}
					{isLoggedIn && role === 'seller' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							onClick={props.btnRemove}
						>
							Delete
						</button>
					)}
					{/* end seller modal */}

					<button
						className={`btn col-6 fw-bold bg-danger ${classes.btnCloseModal}`}
						type="button"
						onClick={props.onHide}
					>
						Close
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalUi;
