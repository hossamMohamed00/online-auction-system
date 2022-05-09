import React, { Fragment } from 'react';
import Navbar  from '../component/HomePage/Header/Navbar';
import {useLocation } from 'react-router-dom';

import ViewCurrentAuction from '../component/Auctions/ViewCurrentAuction/ViewCurrentAuction';
import ViewAllAuctions from '../component/Auctions/ViewAuctions/ViewAllAuction';

function ViewAuctions() {

	const location  = useLocation()
	const AuctionId = new URLSearchParams(location.search).get('id')

	return (
		<Fragment>
			<Navbar/>
			{AuctionId && <ViewCurrentAuction/> }
			{!AuctionId && <ViewAllAuctions/>}

		</Fragment>
	);
}

export default ViewAuctions;