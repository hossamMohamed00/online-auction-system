import React, { useEffect } from 'react';

import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import ViewAuctionDetails from '../../../UI/ViewAuctionDetails/ViewAuctionDetails';
import PageHeader from '../../../UI/Page Header/pageHeader';
import NoData from '../../../UI/NoData';

import classes from './ViewParticipatingAuctions.module.css';

import BuyerDashboardContent from '../BuyerDashboard';
import { getJoinedAuctions } from '../../../../Api/BuyerApi';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

const ViewJoinedAuctions_buyer = () => {
	const { sendRequest, status, data } = useHttp(getJoinedAuctions);

	// static id
	// const id= "6289833e24c958b626b72f9a"
	const idToken = useSelector(store=>store.AuthData.idToken)

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);

	console.log(data && data);
	const columns = [
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
			center: true,
		},
		{
			name: 'Base Price',
			selector: row => row.basePrice,
			center: true,
		},
		{
			name: 'Status',
			selector: row => row.status,
			center: true,
		},
		{
			name: 'Category',
			// selector: row => row.category.name,
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link to={`/categories?id=${props.category._id}`}>{props.category.name}</Link>
					</span>
				);
			},
		},
		{
			name: 'Winning Buyer',
			selector: row => row.winningBuyer ? row.winningBuyer :  'not selected',
			center: true,
		},
		{
			name: 'Seller',
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link to={`/sellerProfile?id=${props.seller._id}`}>{props.seller.name} </Link>
					</span>
				);
			}
		},
		{
			name: 'View Details',
			cell: props => {
				return (
					<span className="text-info ">
						<Link to={`/auctions?id=${props._id}`} >Auction Details</Link>
					</span>
				);
			},
		},
	];


	return (
		<BuyerDashboardContent>
			<PageContent className={classes.ParticipatingAuction}>
				<PageHeader text="View Joined Auctions" />
				<div className="p-0">
					{data && status === 'completed'  && (
							<DataTable
								// selectableRows
								columns={columns}
								data={data.joinedAuctions}
								theme="dark"
								pagination
							/>
					)}
				</div>
			</PageContent>
		</BuyerDashboardContent>
	);
};

export default ViewJoinedAuctions_buyer;
