import React, { useEffect } from 'react';

import useHttp from '../../../../CustomHooks/useHttp';
import { viewSaveAuctionApi } from '../../../../Api/BuyerApi';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import ViewAuctionDetails from '../../../UI/ViewAuctionDetails/ViewAuctionDetails';
import PageHeader from '../../../UI/Page Header/pageHeader';
import NoData from '../../../UI/NoData';
import BuyerDashboardContent from '../BuyerDashboard';

import classes from './SavedAuction.module.css';
import { useSelector } from 'react-redux';


const SavedAuctions = () => {
	const { sendRequest, status, data, error } = useHttp(viewSaveAuctionApi);
	const idToken = useSelector((store)=>store.AuthData.idToken)

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);

	console.log(data && data.savedAuctions);

	return (
		<BuyerDashboardContent>
			<PageContent className={classes.SavedAuction}>
				<PageHeader text="View Saved Auctions" />
				<div className="p-4">
					{data && status === 'completed' && (
						<ViewAuctionDetails AuctionData={data && data.savedAuctions} lg={5} animate={false}/>
					)}
					<NoData
						text={'No Saved Auctions now '}
						data={data && data}
						error={error}
					>
					</NoData>
				</div>
			</PageContent>
		</BuyerDashboardContent>
	);
};

export default SavedAuctions;
