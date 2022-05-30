import React, { useEffect, useState } from 'react';
import { StartComponent } from './StartComponent';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './reviews.css';
import { AddReviewForSeller } from '../sellerDetails';
import useHttp from '../../../../CustomHooks/useHttp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';

export const AddBuyerReview = props => {
	const nameInputRef = React.useRef();

	const [rateValue, setRateValue] = React.useState('');

	const [inputsDisabled, setInputsDisabled] = useState(true);

	let message = props.data && props.data.message;
nameInputRef.current.value=message;
console.log(nameInputRef.current.value)
	const getRateValue = value => {
		setRateValue(value);
	};
	const idToken = useSelector(store => store.AuthData.idToken);

	const { data, status, sendRequest, error } = useHttp(AddReviewForSeller);

	const switchToEdit = () => {
		setInputsDisabled(!inputsDisabled);
		nameInputRef.current.value = '';
		console.log(nameInputRef.current.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const reviewData = {
			message: nameInputRef.current.value,
			review: rateValue,
			seller: props.seller,
		};
		sendRequest({ idToken: idToken, reviewData: reviewData });
	};

	useEffect(() => {
		if (status === 'completed') {
			toast.success('Your review has been added successfully 💖🐱‍👤');
		} else {
			toast.error(error);
		}
	}, [status]);
	return (
		<>
			<ToastContainer theme="dark" />
			<form className="row" onSubmit={handleSubmit}>
				<div className=" addContainer d-inline-block position-relative ">
					<div class="form-check form-switch">
						<input
							class="form-check-input"
							type="checkbox"
							id="flexSwitchCheckDefault"
							onClick={switchToEdit}
						/>
						<label
							class="form-check-label text-light"
							for="flexSwitchCheckDefault"
						>
							Switch to edit your review
						</label>
					</div>
					<label className="text-light d-block mt-4 fw-bold fs-6" for="rating">
						Edit your Review
					</label>
					<input
						type="text"
						placeholder="Type your review message..."
						className="form-control w-50 rate_input d-inline-block"
						ref={nameInputRef}
						disabled={inputsDisabled}

					/>
					<span className="star_con">
						{inputsDisabled && (
							<div className="star_container d-inline-block">
								{[...Array(props.data && props.data.review)].map(() => (
									<FaStar className="star" color="#ffc107" size={20} />
								))}
							</div>
						)}
						{!inputsDisabled && <StartComponent value={getRateValue} />}
					</span>
					<button
						className="btn btn-primary save_rate_btn"
						disabled={inputsDisabled}
					>
						Submit Review
					</button>
				</div>
			</form>
		</>
	);
};
