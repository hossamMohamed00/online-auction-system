import React, { useEffect } from 'react';
import { getAllAuctions } from '../../../../Api/AuctionsApi';
import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import ViewAuctionDetails from '../../../UI/ViewAuctionDetails/ViewAuctionDetails';
import SellerDashboardContent from '../SellerModule';

import classes from './ViewAllAuctions.module.css';

const ViewAllAuctions = () => {
	const { sendRequest, status, data } = useHttp(getAllAuctions);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	return (
		<SellerDashboardContent>
			<PageContent className={`${classes.PageContentClasses}`}>
				<PageHeader text="All auctions" showLink={false} />
				<div className="p-5">
					{data && status === 'completed' && (
						<ViewAuctionDetails AuctionData={data} lg={6} />
					)}
				</div>
			</PageContent>
		</SellerDashboardContent>
	);
};

export default ViewAllAuctions;
