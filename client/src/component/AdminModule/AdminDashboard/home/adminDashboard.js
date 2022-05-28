import React from 'react';
import {useSelector} from 'react-redux';
// import Categories from './../../../HomePage/Categories/Categories';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import AdminDashboardContent from '../Admin_dashboard_content/admin_dashboard';
// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = props => {
	const dropdownListForEmployees = [
		{
			title: 'ListAllEmployees',
			icon: faUser,
			path: '/adminDashboard/listAllEmployees',
		},
		{
			title: 'AddEmployee',
			icon: faUser,
			path: '/adminDashboard/addEmployee',
		},
	];
	const dropdownListManageAuctions = [
		{
			title: 'All Auctions',
			icon: faGavel,
			path: '/adminDashboard/allAuctions',
		},
		{
			title: 'Current Auctions',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},

		{
			title: 'Upcoming Auctions',
			icon: faGavel,
			path: '/adminDashboard/upcomingAuctions',
		},
	];

	const dropdownListManageUsers = [
		{ title: 'All Users', icon: faUser, path: '/adminDashboard/allUsersPage' },
		{ title: 'Sellers', icon: faUser, path: '/adminDashboard/sellersPage' },
		{ title: 'Buyers', icon: faUser, path: '/adminDashboard/buyersPage' },
	];
	const dropdownListAuctionsRequests = [
		{
			title: 'Pending auctions',
			icon: faTh,
			path: '/adminDashboard/pendingAuctions',
		},
	];
	const dropdownListManageCategories = [
		{
			title: 'Manage Categories',
			icon: faTh,
			path: '/adminDashboard/manageCategories',
		},
	];
const email = useSelector(store => store.AuthData.email)
	const contentExist = props.children;

	return (
		<DashboardLayout
			admin={{ name: email}}
			Employees={{ name: 'Manage Employees  ', list: dropdownListForEmployees }}
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
			{contentExist ? props.children : <AdminDashboardContent />}
		</DashboardLayout>
	);
};

export default AdminDashboard;
