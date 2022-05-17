import React from 'react';
// import Categories from './../../../HomePage/Categories/Categories';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = props => {
	const dropdownListForAdmin = [
		{ title: 'Profile', icon: faUser, path: '/adminDashboard/adminProfile' },
		{ title: 'Inbox', icon: faMessage, path: '/adminDashboard/chatPage' },
	];
	const dropdownListManageAuctions = [
		{
			title: 'Current Auctions',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
		{
			title: 'Ongoing Auctions',
			icon: faGavel,
			path: '/adminDashboard/ongoingAuctions',
		},
	];

	const dropdownListManageUsers = [
		{ title: 'All Users', icon: faUser, path: '/adminDashboard/allUsersPage' },
		{ title: 'Sellers', icon: faUser, path: '/adminDashboard/sellersPage' },
		{ title: 'Buyers', icon: faUser , path: '/adminDashboard/buyersPage'},
	];
	const dropdownListAuctionsRequests = [
		{
			title: 'Pending auctions',
			icon: faTh,
			path: '/adminDashboard/pendingRequests',
		},
	];
	const dropdownListManageCategories = [];

	const contentExist = props.children;

	return (
		<DashboardLayout
			admin={{ name: 'Safa Ramadan  ', list: dropdownListForAdmin }}
			users={{ name: 'Manage Users  ', list: dropdownListManageUsers }}
			auctions={{ name: 'Manage Auctions', list: dropdownListManageAuctions }}
			requests={{
				name: 'Manage Requests   ',
				list: dropdownListAuctionsRequests,
			}}
			categories={{
				name: 'Manage Categories',
				list: dropdownListManageCategories,
			}}
		>
			{contentExist ? (
				props.children
			) : (
				<PageContent>
					<h1>Welcome Admin</h1>
				</PageContent>
			)}
		</DashboardLayout>
	);
};

export default AdminDashboard;
