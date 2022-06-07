import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import { getAllAuctions, getFilterAuction } from '../../../Api/AuctionsApi';
import useHttp from '../../../CustomHooks/useHttp';
import ViewAuctionDetails from '../../UI/ViewAuctionDetails/ViewAuctionDetails';

import PageHeader from '../../UI/Page Header/pageHeader';
import NoData from '../../UI/NoData';

import classes from './ViewAllAuctions.module.css';
import FilterdAuctions from './FilterdAuction';
import Navbar from '../../HomePage/Header/Navbar';

const ViewAllAuctions = () => {
	const [showFilter, setShowFilter] = useState(null);
	const [Data, setData] = useState(null);

	const [FilterAuction, setFilterAuction] = useState(false);
	const [FilterdDetails, setFilterdDetails] = useState(null);

	const { sendRequest, status, data, error } = useHttp(getAllAuctions);
	// const {
	// 	sendRequest: sendFilterdRequest,
	// 	status: FilterdRequestStatus,
	// 	data: data,
	// } = useHttp(getFilterAuction);

	useEffect(() => {
		if (!FilterAuction) {
			console.log('query1')
			sendRequest('');
		} else{
			if( FilterdDetails.AuctionType || FilterdDetails.AuctionCategory) {
			const queryParams = `${FilterdDetails.AuctionCategory ? `?category=${FilterdDetails.AuctionCategory}&` : '?'}${FilterdDetails.AuctionType && `status=${FilterdDetails.AuctionType}&`}`
			console.log(queryParams)
			sendRequest(queryParams);
			}
			// setFilterdDetails(null)
			// setFilterAuction(false)
		}

	}, [sendRequest, FilterAuction , FilterdDetails]);

	useEffect(() => {
		if (status === 'completed') {
			setData(
				data.filter(
					data => data.status !== 'pending' && data.status !== 'denied',
				),
			);
		}
	}, [status]);
	const showFilterHandler = () => {
		setShowFilter(true);
	};

	const hideFilterHandler = () => {
		setShowFilter(false);
	};

	const filterHandler = values => {
		if (values) {
			setFilterAuction(true);
			setFilterdDetails(values);
		} else {
			setFilterAuction(false);
		}
	};

	return (
		<div className={classes.ViewAllAuctions}>
			<Navbar />
			<Row className="m-0 p-0">
				<Col md={4} lg={2} className="m-0 p-0">
					<FilterdAuctions
						hideFilter={hideFilterHandler}
						showFilter={showFilter}
						filterHandler={filterHandler}
						filter={FilterAuction}
						clearFilter={() => setFilterAuction(false)}

					/>
				</Col>

				<Col md={8} lg={10}>
					{data && data.length > 0 ? (
						<div className={classes.AllAuction}>
							<PageHeader text="View All Auctions" showLink={false} />

							{/* Auction Filter in Small Media Query */}
							<div
								className={`${classes.FilterIcons} ${
									showFilter ? 'mt-0' : ''
								} text-end `}
							>
								{!showFilter && (
									<button
										className="btn bg-none text-light d-md-none d-sm-inline-block"
										onClick={showFilterHandler}
									>
										<FontAwesomeIcon icon={faFilter} className=" px-2" />
										Filter Auction
									</button>
								)}
							</div>

							{data && status === 'completed' && (
								<ViewAuctionDetails
									AuctionData={data}
									animate={false}
								/>
							)}

						</div>

					):
					<div className='pt-3'>
						<NoData
							text="No Auctions Now"
							// data={data & data}
							// error={error && error}
						/>
					</div>



				}


				</Col>
			</Row>
		</div>
	);
};

export default ViewAllAuctions;
