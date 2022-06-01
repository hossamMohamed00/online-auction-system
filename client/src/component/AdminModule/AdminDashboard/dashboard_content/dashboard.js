import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PageHeader from '../../../UI/Page Header/pageHeader';
import useHttp from '../../../../CustomHooks/useHttp';
import { getDashboardData } from '../../../../Api/Admin';
import { getWinners } from '../../../../Api/Admin';
import { getTopAuctions } from '../../../../Api/Admin';
import { getProfileData } from '../../../../Api/Admin';

import './admin.css';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import { CardsContainer } from './card_content/CardsContainer';
const DashboardContent = props => {
	const { sendRequest, data, error } = useHttp(getDashboardData);
	const [loading, setLoading] = useState(false);
	const {
		sendRequest: sendRequestForWinners,
		data: dataForWinners,
		status,
	} = useHttp(getWinners);
	const {
		sendRequest: sendRequestForAuctions,
		data: dataForAuctions,
		status: statusForAuctions,
	} = useHttp(getTopAuctions);
	const {
		sendRequest: sendRequestForProfile,
		data: dataForProfile,
		status: statusForProfile,
	} = useHttp(getProfileData);
	const idToken = useSelector(store => store.AuthData.idToken);
	const role = useSelector(store => store.AuthData.role);
	console.log(props.reload);
	useEffect(() => {
		sendRequest(idToken);
		sendRequestForWinners(idToken);
		sendRequestForAuctions(idToken);
		sendRequestForProfile(idToken);
		setInterval(() => {
			setLoading(true);
			sendRequest(idToken);
			sendRequestForWinners(idToken);
			sendRequestForAuctions(idToken);
			sendRequestForProfile(idToken);
		}, 60000);
	}, [
		sendRequest,
		sendRequestForWinners,
		sendRequestForAuctions,
		sendRequestForProfile,
	]);

	const cardTitlesForAuctions = [
		{
			name: 'Current ',
			number: data && data.auctions.ongoing,
			path: '/managersDashboard/currentAuctions',
		},
		{
			name: '	Upcoming ',
			number: data && data.auctions.upcoming,
			path: '/managersDashboard/upcomingAuctions',
		},
		{
			name: '	Pending ',
			number: data && data.auctions.pending,
			path: '/managersDashboard/pendingAuctions',
		},
	];
	const cardTitlesForUsers = [
		{
			name: 'Sellers',
			number: data && data.users.sellers,
			path: '/managersDashboard/sellersPage',
		},
		{
			name: 'Buyers',
			number: data && data.users.buyers,
			path: '/managersDashboard/buyersPage',
		},
		{
			name: 'Employees',
			number: data && data.users.employees,
			path: '/managersDashboard/listAllEmployees',
		},
	];
	const cardTitlesForCompliments = [
		{
			name: 'Compliments',
			number: data && data.complaints.total,
			path: '/managersDashboard/allCompliments',
		},
		{
			name: 'Not read',
			number: data && data.complaints.notReadYet,
			path: '/managersDashboard/notRead',
		},
	];
	const columns = [
		{
			name: 'Auction Title',
			selector: row => row.auction.title,
			center: true,
			hyperlink: true,
			cell: props => {
				console.log(props);
				return (
					<span className="text-decoration-none fw-bold">
						<Link to={`/auctions?id=${props.auction._id}`}>
							{props.auction.title}
						</Link>
					</span>
				);
			},
		},
		{
			name: 'WinnerEmail',
			selector: row => row.winningBuyer.email,
			center: true,
			hyperlink: true,
			cell: props => {
				console.log(props);
				return (
					<span className="text-decoration-none fw-bold">
						<Link to={`/buyers?id=${props.auction._id}`}>
							{props.winningBuyer.email}
						</Link>
					</span>
				);
			},
		},

		{
			name: 'Winning Price',
			selector: row => row.winningPrice,
			center: true,
		},
	];
	const items = dataForWinners ? dataForWinners : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	return (
		<>
			<div className="mt-5 ">
				<PageHeader
					text={`Welcome back ${dataForProfile && dataForProfile.name}`}
					showLink={false}
				/>
			</div>

			<div className="container_">
				{/* start top 5 Auctions */}
				<div className="top_auctions">
					<h2 className="text-light mt-3 fw-bold">Top ongoing Auctions</h2>
					<div className="row mt-4 auction_container">
						{dataForAuctions &&
							dataForAuctions.map((item, index) => {
								return (
									<>
										<div className="col-lg-4 text-light  fw-border top">
											<div className="auction">
												<h3 className="num bg-danger d-inline-block text-center text-light">
													{index + 1}
												</h3>
												<div className="img d-inline-block">
													{/* <img src={auctionImg} /> */}
												</div>
												<h4 className="d-inline-block ms-2 ">{item.title}</h4>
												<div className="bidders">
													Number of bidders :{' '}
													<span className="text-light">{item.__v}</span>
												</div>
											</div>
										</div>
									</>
								);
							})}
					</div>
				</div>

				{/* end top 5 Auctions */}

				{/* Start Cards */}
				<CardsContainer title="Auctions" cards={cardTitlesForAuctions} />
				<CardsContainer title="Users" cards={cardTitlesForUsers} />
				{role === 'employee' && (
					<CardsContainer
						title="Compliments"
						cards={cardTitlesForCompliments}
					/>
				)}
				{/* End Cards */}

				{/* start winners */}
				<div className="winners">
					{' '}
					<h2 className="text-light mt-2 fw-bold">Auctions winners</h2>
					{dataForWinners && (
						<DataTable
							columns={columns}
							data={filteredItems}
							subHeader
							subHeaderComponent={filterFun}
							theme="dark"
							pagination
						/>
					)}
				</div>

				{/* end winners */}
			</div>
		</>
	);
};
export default DashboardContent;
