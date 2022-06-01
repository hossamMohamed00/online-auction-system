import React, { Fragment, useEffect } from 'react';
import UpComingCarousel from './UpComingCarousel';

import { getUpComingAuctions } from '../../../Api/AuctionsApi';
import useHttp from '../../../CustomHooks/useHttp';
import NoData from '../../UI/NoData';
import PageHeader from '../../UI/Page Header/pageHeader';

import classes from './UpComingAuctions.module.css';

const UpComingAuctions = () => {
	const { sendRequest, status, data, error } = useHttp(getUpComingAuctions);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	return (
		<Fragment>
			<div className={` ${classes.UpComingAuctions} container-fluid`}>
				<PageHeader text="UpComing Auctions" showLink={true} />
				<div className={classes.UpComingAuctionsContent}>
					{status === 'completed' && data.length > 0 && (
						<UpComingCarousel UogoingAuctionData={data} />
					)}
				</div>

				<NoData
					text="No UpComing Auctions Now"
					data={data && data}
					error={error && error}
				/>
			</div>
		</Fragment>
	);
};

export default UpComingAuctions;
