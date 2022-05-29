import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './profile.css';
import './tabs.css';
import coverImg from '../../../assets/fbc2a961bfd0e7b5673a7922cb848cdb.jpg';
import profileImg from '../../../assets/download.png';
import { CardsContainer } from './../../AdminModule/AdminDashboard/dashboard_content/card_content/CardsContainer';

import ProfileDetails from './profileDetails';
import Auctions from './Auctions';
import Reviews from './Reviews';
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

	const btnBidsHandler = () => {
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
	const role = useSelector(store => store.AuthData.role);

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
							{(role === 'admin' || role === 'employee') && (
								<button className="btn btn-danger">Block</button>
							)}
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
						onClick={btnBidsHandler}
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
				{isShownDetails && <ProfileDetails sellerData={props.seller} />}
				{isShownAuctions && <Auctions auctionsData={props.auctions} />}
				{isShownReviews && <Reviews reviews={props.reviews} />}
				{/* end tabs */}
			</div>
		</>
	);
};
export default UserProfile;
{
	/* <div className="profile_cards">
						<CardsContainer
							title="joined Auctions"
							cards={props.cards}
							class="profile_card "
							card-class="cardP"
						/>
					</div> */
}
{
	/* <hr className="bg-light profileHr2" /> */
}
