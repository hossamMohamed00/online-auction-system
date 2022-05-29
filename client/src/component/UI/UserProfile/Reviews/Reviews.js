import React from 'react';
import './reviews.css';
import { AddReview } from './AddReview';
const Reviews = () => {
	return (
		<>
			<AddReview />
			<div className="card_container_Profile">
				<h2 className="text-light text-center mt-4 fw-bold reviews_list">Recent Reviews</h2>
				{/* <div className="card_profile">card</div>
				<div className="card_profile">card</div> */}
			</div>
		</>
	);
};
export default Reviews;
