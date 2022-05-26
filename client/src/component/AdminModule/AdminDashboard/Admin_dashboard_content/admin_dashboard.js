import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../../UI/Page Header/pageHeader';
import useHttp from '../../../../CustomHooks/useHttp';
import { getDashboardData } from '../../../../Api/Admin';
import { getWinners } from '../../../../Api/Admin';
import { getTopAuctions } from '../../../../Api/Admin';
import './admin.css';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import auctionImg from '../../../../assets/gavel.png';
const AdminDashboardContent = () => {
	const { sendRequest, data, error } = useHttp(getDashboardData);
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
	const idToken = useSelector(store => store.AuthData.idToken);
	// const [winnersData,setWinnersData]= useState([]);
	useEffect(() => {
		sendRequest(idToken);
		sendRequestForWinners(idToken);
		sendRequestForAuctions(idToken);
	}, [sendRequest, sendRequestForWinners]);

	const cardTitlesForAuctions = [
		{
			name: 'Current ',
			number: data && data.auctions.ongoing,
			path: '/adminDashboard/currentAuctions',
		},
		{
			name: '	Upcoming ',
			number: data && data.auctions.upcoming,
			path: '/adminDashboard/upcomingAuctions',
		},
		{
			name: '	Pending ',
			number: data && data.auctions.pending,
			path: '/adminDashboard/pendingAuctions',
		},
	];
	const cardTitlesForUsers = [
		{
			name: 'Sellers',
			number: data && data.users.sellers,
			path: '/adminDashboard/sellersPage',
		},
		{
			name: 'Buyers',
			number: data && data.users.buyers,
			path: '/adminDashboard/buyersPage',
		},
		{
			name: 'Employees',
			number: data && data.users.employees,
			path: '/adminDashboard/listAllEmployees',
		},
	];

	const columns = [
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
			name: 'Winning Price',
			selector: row => row.winningPrice,
			center: true,
		},
	];
	//filter
	const items = dataForWinners ? dataForWinners : [];
	const { filterFun, filteredItems } = useFilter(items);

	console.log({ filteredItems });
	//end filter
	return (
		<>
			<PageHeader text="Welcome back Admin" showLink={false} />
			<div className="container_">
				{/* start top 5 Auctions */}
				<h2 className="text-light mt-2 fw-border">Top ongoing Auctions</h2>
				<div className="row mt-3 auction_container">
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

				{/* end top 5 Auctions */}

				{/* Start Cards */}
				<div className="card_container_1 row">
					<h2 className="text-light fw-bolder d-flex justify-content-center ">
						Auctions💖🔨
					</h2>
					{cardTitlesForAuctions.map(card => {
						return (
							<>
								<div className="col-lg-3 col-md-3 fw-bolder text-center  card_1 mx-2 h-100 mb-3">
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
				<div className="card_container_2  row">
					<h2 className="text-light d-flex justify-content-center  fw-bolder">
						Users💖👀
					</h2>

					{cardTitlesForUsers.map(card => {
						return (
							<>
								<div className="col-lg-3 col-md-3 fw-bolder text-center   card_2 mx-2 h-100 mb-3">
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
				<h2 className="text-light mt-2 fw-border">Auctions winners💖🏆</h2>
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
				{/* end winners */}
			</div>
		</>
	);
};
export default AdminDashboardContent;
