import React from 'react';
import { StartComponent } from './StartComponent';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './reviews.css';
import { AddReviewForSeller } from '../sellerDetails';
import useHttp from '../../../../CustomHooks/useHttp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddReview = props => {
	const nameInputRef = React.useRef();
	const [rateValue, setRateValue] = React.useState('');
	const getRateValue = value => {
		setRateValue(value);
	};
	console.log(rateValue);
	const idToken = useSelector(store => store.AuthData.idToken);

	const { data, status, sendRequest, error } = useHttp(AddReviewForSeller);

	const handleSubmit = e => {
		e.preventDefault();
		const reviewData = {
			message: nameInputRef.current.value,
			review: rateValue,
			seller: props.seller,
		};
		sendRequest({ idToken: idToken, reviewData: reviewData });
	};

	React.useEffect(() => {
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
					<label className="text-light d-block mt-4 fw-bold fs-6" for="rating">
						Add your Review
					</label>
					<input
						type="text"
						placeholder="Type your review message..."
						className="form-control w-50 rate_input d-inline-block"
						ref={nameInputRef}
					/>
					<span className="star_con">
						<StartComponent value={getRateValue} />
					</span>
					<button className="btn btn-primary save_rate_btn">
						Submit Review
					</button>
				</div>
			</form>
		</>
	);
};
