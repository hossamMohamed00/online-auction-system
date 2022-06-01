import React from 'react';
import { useSelector } from 'react-redux';
import '../Reviews/reviews.css';
import './details.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CardsContainer } from '../../../AdminModule/AdminDashboard/dashboard_content/card_content/CardsContainer';

const ProfileDetails = props => {

	const cards = [
		{
			name: 'Auctions',
			number: props.data && props.data.auctions.length,
			handler: props.auctionsHandler,
		},
		{
			name: 'Reviews',
			number: props.data && props.data.reviews.length,
			handler: props.reviewsHandler,
		},
	];
	const role = useSelector(store => store.AuthData.role);

	return (
		<>
			<h2 className="text-light mt-4 text-center fw-bold">
				Seller personal Details
			</h2>
			<div className="card_container_Profile details row">
				<div className="info col-lg-3 text-light">
					<h4>
						<FontAwesomeIcon icon={faPhone} />
						<p className="ms-2  d-inline-block">01128803117</p>
					</h4>
					<h4>
						<FontAwesomeIcon icon={faEnvelope} />
						<p className="ms-2  d-inline-block">
							{props.sellerData && props.sellerData.email}
						</p>
					</h4>

				</div>
				<div className="cards_seller col-lg text-light">
					{
						<CardsContainer
							cards={cards}
							class="profile_card "
							card-class="cardD"
							profile_btn="profile_btn"
						/>
					}
				</div>
			</div>
		</>
	);
};
export default ProfileDetails;
