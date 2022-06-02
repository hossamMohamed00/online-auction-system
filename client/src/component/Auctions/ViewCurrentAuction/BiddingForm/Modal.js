import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SaveAuctionApi } from '../../../../Api/BuyerApi';
import useHttp from '../../../../CustomHooks/useHttp';
import classes from './Modal.module.css';

const ModalUi = props => {

	console.log(props.SavedAuctionId)
	const [BidValue, setBidValue] = useState(1500);
	const [isBidValid, setIsBidValid] = useState(true);
	const rejectRef = useRef();

	const role = useSelector(store => store.AuthData.role);
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);

	// start Saved Auction Handler
	const {sendRequest:sendRequestForSaveAuction, status:statusForSaveAuction , data:dataForSaveAuction , error:errorForSaveAuction } = useHttp(SaveAuctionApi);
	const idToken = useSelector(store => store.AuthData.idToken);

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


	const BidValueValidation = e => {
		setBidValue(e.target.value);
		if (e.target.value.trim() < 1500) {
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
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && (
						<h2 className="fw-bold">Place a Bid </h2>
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
				</Modal.Title>
			</Modal.Header>

			{/* Modal Body when user Is loggedIn && Auction status is ongoing  */}
			<Modal.Body className={classes.BiddingModalBody}>
				<>
					{/* for buyer */}
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && (
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
										min="1500"
										value={BidValue}
										onChange={BidValueValidation}
									/>
									<span
										className={` input-group-text ${classes['input-group-text']} `}
									>
										$
									</span>
								</div>
								{!isBidValid && (
									<p className="px-2">
										You must bid at least{' '}
										<span className={classes.bidValue}> 1500 $ </span>
									</p>
								)}
							</div>

							<div className="pt-4">
								<div className="d-flex justify-content-between">
									<p> Your Balance </p>
									<p> 75,200 $ </p>
								</div>

								<div className="d-flex justify-content-between">
									<p> Service Fee </p>
									<p> 5 $ </p>
								</div>

								<div className="d-flex justify-content-between">
									<p> Total Bid </p>
									{/* <p className={!isBidValid ? classes['Alarm'] : ''} > {BidValue ? parseInt(BidValue) + 5 : 5 } $ </p> */}
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
					{/* buyer modal */}
					{isLoggedIn && !props.UpComingAuction && role === 'buyer' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnPlaceMyBid}`}
							type="button"
						>
							Place My Bid
						</button>
					)}
					{!isLoggedIn && (
						<Link
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							to="/login"
						>
							Login
						</Link>
					)}
					{isLoggedIn && props.UpComingAuction && role === 'buyer' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							onClick={btnSavedHandler}
						>
							Save
						</button>
					)}
					{/* Admin modal */}
					{props.btnReject && role === 'admin' && (
						<button
							className={`btn col fw-bold bg-light ${classes.btnLogin}`}
							type="button"
							onClick={() => props.rejectHandler(rejectRef.current.value)}
						>
							Submit
						</button>
					)}

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
