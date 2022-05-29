import React, { useState } from 'react';
import './profile.css';
import './tabs.css';
import coverImg from '../../../assets/fbc2a961bfd0e7b5673a7922cb848cdb.jpg';
import profileImg from '../../../assets/download.png';
import { CardsContainer } from './../../AdminModule/AdminDashboard/dashboard_content/card_content/CardsContainer';

import ProfileDetails from './profileDetails/profileDetails';
import Auctions from './Auctions/Auctions';
import Reviews from './Reviews/Reviews';
const UserProfile = props => {
	// Handle Tabs
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownAuctions, setIsShownAuctions] = useState(false);
	const [isShownReviews, setIsShownReviews] = useState(false);

	const btnDetailsHandler = () => {
		setIsShownDetails(true);
		setIsShownAuctions(false);
		setIsShownReviews(false);
	};

	const btnAuctionsHandler = () => {
		setIsShownDetails(false);
		setIsShownReviews(false);
		setIsShownAuctions(true);
	};
	const btnSellerReviews = () => {
		setIsShownDetails(false);
		setIsShownAuctions(false);
		setIsShownReviews(true);
	};
	// end

	return (
		<>
			<div className="container-fluid container_profile">
				<section className="header_container position-relative">
					<header className="header">
						<img src={coverImg} />
						<div className="profile">
							<img src={profileImg} />
							<h5 className="text-light">{props.name}</h5>
							<p>{props.role}</p>
						</div>
					</header>
				</section>
				{/* tabs */}
				<div className={'AuctionHeader'}>
					<button
						className={`btn ${isShownDetails ? 'ActiveLink' : ''}`}
						onClick={btnDetailsHandler}
					>
						Details
					</button>

					<button
						className={`btn ${isShownAuctions ? 'ActiveLink' : ''}`}
						onClick={btnAuctionsHandler}
					>
						Auctions
					</button>
					<button
						className={`btn ${isShownReviews ? 'ActiveLink' : ''}`}
						onClick={btnSellerReviews}
					>
						Reviews
					</button>
				</div>
				{isShownDetails && (
					<ProfileDetails
						sellerData={props.seller}
						data={props.data}
						reviewsHandler={btnSellerReviews}
						auctionsHandler={btnAuctionsHandler}
					/>
				)}
				{isShownAuctions && <Auctions auctionsData={props.auctions} />}
				{isShownReviews && <Reviews reviews={props.reviews} />}
				{/* end tabs */}
			</div>
		</>
	);
};
export default UserProfile;

{
	/* <hr className="bg-light profileHr2" /> */
}
