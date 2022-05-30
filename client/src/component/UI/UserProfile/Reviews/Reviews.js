import React from 'react';
import './reviews.css';
import { FaStar } from 'react-icons/fa';
import { AddReview } from './AddReview';
const Reviews = props => {
	console.log(props);
	return (
		<>
			<AddReview seller={props.sellerId} />
			<div className="card_container_Profile">
				<h2 className="text-light text-center mt-4 fw-bold reviews_list">
					Recent Reviews
				</h2>

				{props.reviews.map((review, index) => {
					return (
						<>
							<div className="">
								<h5 className="text-light me-4 d-inline-block">
									{review.buyer.name} :{' '}
								</h5>
								<p className="text-light me-4 d-inline-block">
									{review.message}
								</p>
								{[...Array(review.review)].map(() => (
									<FaStar className="star" color="#ffc107" size={20} />
								))}
								<hr />
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};
export default Reviews;
