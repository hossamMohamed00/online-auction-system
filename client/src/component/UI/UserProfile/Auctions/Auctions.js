import React from 'react';
import ViewAuctionDetails from '../../ViewAuctionDetails/ViewAuctionDetails';
import '../profile.css';

const Auctions = props => {
	return (
		<section className="profile_content">
			<div className="profile_table ">
				<h2 className="text-light mt-4 py-5 text-center fw-bold">
					Seller Auctions
				</h2>
				<ViewAuctionDetails AuctionData={props.auctionsData} lg={4} />
			</div>
		</section>
	);
};
export default Auctions;
