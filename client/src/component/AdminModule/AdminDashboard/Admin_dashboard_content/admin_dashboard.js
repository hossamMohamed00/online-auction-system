import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
import auctionImg from '../../../../assets/gavel.png';
const AdminDashboardContent = props => {
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
				<div className="card_container_1 row m-0">
					<h2 className="text-light fw-bolder text-center pb-4 pt-2  ">
						Auctions💖🔨
					</h2>
					{cardTitlesForAuctions.map(card => {
						const first_card_classes =
							card.name === 'Current' ? 'first_card' : '';

						return (
							<>
								<div
									className={` col-lg-4  fw-bolder text-center  card_1 h-100 mb-3`}
								>
									{card.name}
									<h1 className="text-center text-danger mt-2 fw-border">
										{card.number}
									</h1>
									<Link to={card.path}>
										<span className="icon">
											<FontAwesomeIcon icon={faArrowRight} />
										</span>
									</Link>
								</div>
							</>
						);
					})}
				</div>
				<div className="card_container_2  row m-0">
					<h2 className="text-light text-center pb-4 pt-2  fw-bolder">
						Users💖👀
					</h2>

					{cardTitlesForUsers.map(card => {
						return (
							<>
								<div
									className={` col-lg-4  fw-bolder text-center  card_2 h-100 mb-3`}
								>
									{card.name}
									<h1 className="text-center text-danger mt-2 fw-border">
										{card.number}
									</h1>
									<Link to={card.path}>
										<span className="text-right icon">
											<FontAwesomeIcon icon={faArrowRight} />
										</span>
									</Link>
								</div>
							</>
						);
					})}
				</div>

				{/* End Cards */}

				{/* start winners */}
				<div className="winners">
					{' '}
					<h2 className="text-light mt-2 fw-bold">Auctions winners💖🏆</h2>
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
export default AdminDashboardContent;
