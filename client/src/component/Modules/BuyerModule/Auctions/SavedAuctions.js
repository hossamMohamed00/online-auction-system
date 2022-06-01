import React, { useEffect } from 'react';

import { getAllAuctions } from '../../../../Api/AuctionsApi';
import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import ViewAuctionDetails from '../../../UI/ViewAuctionDetails/ViewAuctionDetails';
import PageHeader from '../../../UI/Page Header/pageHeader';
import NoData from '../../../UI/NoData';

import classes from './SavedAuction.module.css';

import BuyerDashboardContent from '../BuyerDashboard';

const SavedAuctions = () => {
	const { sendRequest, status, data, error } = useHttp(getAllAuctions);

	const allData = [];

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	console.log(data && data);

	return (
		<BuyerDashboardContent>
			<PageContent className={classes.SavedAuction}>
				<PageHeader text="View Saved Auctions" />
				<div className="p-4">
					{allData && status === 'completed' && allData.length > 0 && (
						<ViewAuctionDetails AuctionData={data && data} lg={6} />
					)}
					<NoData
						text={'No Saved Auctions now '}
						data={allData && allData}
						error={error}
					>
						{' '}
					</NoData>
				</div>
			</PageContent>
		</BuyerDashboardContent>
	);
};

export default SavedAuctions;
