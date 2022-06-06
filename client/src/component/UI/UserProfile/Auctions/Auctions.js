import React from 'react';
import NoData from '../../NoData';
import ViewAuctionDetails from '../../ViewAuctionDetails/ViewAuctionDetails';
import '../profile.css';

const Auctions = props => {
	return (
		<section className="profile_content">
			<div className="profile_table ">
				<h2 className="text-light mt-4 mb-0 py-5 text-center fw-bold">
					Seller Auctions
				</h2>
				<div className="mb-0">
					{' '}
					{props.auctionsData.length !== 0 ? (
						<ViewAuctionDetails AuctionData={props.auctionsData} lg={4} />
					) : (
						<div className="mb-0">
							<NoData text=" No Auctions yet " />
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
export default Auctions;
