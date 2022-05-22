
import React, { useEffect } from 'react';

import { getAllAuctions } from '../../../../Api/AuctionsApi';
import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import ViewAuctionDetails from '../../../UI/ViewAuctionDetails/ViewAuctionDetails';
import AuctionHeader from '../../../UI/AuctionHeader/AuctionHeader';
import NoData from '../../../UI/NoData';


import classes from './ViewParticipatingAuctions.module.css';

import BuyerDashboardContent from '../BuyerDashboard';

const ViewParticipatingAuctions = () => {
	const {sendRequest ,  status , data , error } = useHttp(getAllAuctions)
	const allData = []

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	console.log(data && data)

	return (
		<BuyerDashboardContent>
			<PageContent className={classes.ParticipatingAuction}>
				<AuctionHeader text="View Participating Auctions" />
				<div className='p-4'>
					{allData && status==='completed' && allData.length > 0 && <ViewAuctionDetails AuctionData = {data && data} lg={6} />}
					<NoData text={"No Participating Auctions "} data={allData && allData} error={error} > </NoData>
				</div>

			</PageContent>
		</BuyerDashboardContent>
	);
}

export default ViewParticipatingAuctions;