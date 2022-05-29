import React from 'react';
import { StartComponent } from './StartComponent';
import './reviews.css';

export const AddReview = () => {
	return (
		<form className="row">
			<div className=" addContainer d-inline-block position-relative ">
				<label className="text-light d-block mt-4 fw-bold fs-6" for="rating">
					Add your Review
				</label>
				<input
					type="text"
					placeholder="Type your review message..."
					className="form-control w-50 rate_input d-inline-block"
				/>
				<span className="star_con">
					<StartComponent />
				</span>
				<button className="btn btn-primary save_rate_btn">Submit Review</button>
			</div>
		</form>
	);
};
