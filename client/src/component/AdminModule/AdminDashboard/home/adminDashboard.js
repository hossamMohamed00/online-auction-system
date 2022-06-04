import React from 'react';
import { useSelector } from 'react-redux';
// import Categories from './../../../HomePage/Categories/Categories';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';
import { faComment, faGavel } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faMessage } from '@fortawesome/free-solid-svg-icons';
import DashboardContent from '../dashboard_content/dashboard';

const AdminDashboard = props => {
	const dropdownListForCompliments = [
		{
			title: 'All Compliments',
			icon: faComment,
			path: '/managersDashboard/allComplaints',
		},
	];
	const dropdownListForInquiries = [
		{
			title: 'Inquiries ',
			icon: faComment,
			path: '/employeeDashBoard/chat',
		},
	];
	const dropdownListForEmployees = [
		{
			title: 'ListAllEmployees',
			icon: faUser,
			path: '/managersDashboard/listAllEmployees',
		},
		{
			title: 'AddEmployee',
			icon: faUser,
			path: '/managersDashboard/addEmployee',
		},
	];
	const dropdownListManageAuctions = [
		{
			title: 'All Auctions',
			icon: faGavel,
			path: '/managersDashboard/allAuctions',
		},
		{
			title: 'Current Auctions',
			icon: faGavel,
			path: '/managersDashboard/currentAuctions',
		},

		{
			title: 'Upcoming Auctions',
			icon: faGavel,
			path: '/managersDashboard/upcomingAuctions',
		},
	];

	const dropdownListManageUsers = [
		{ title: 'Sellers', icon: faUser, path: '/managersDashboard/sellersPage' },
		{ title: 'Buyers', icon: faUser, path: '/managersDashboard/buyersPage' },
	];
	const dropdownListAuctionsRequests = [
		{
			title: 'Pending auctions',
			icon: faTh,
			path: '/managersDashboard/pendingAuctions',
		},
	];
	const dropdownListManageCategories = [
		{
			title: 'Manage Categories',
			icon: faTh,
			path: '/managersDashboard/manageCategories',
		},
	];
	const email = useSelector(store => store.AuthData.email);
	const contentExist = props.children;

	return (
		<DashboardLayout
			admin={{ name: email ? email : 'user' }}
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
			compliments={{
				name: 'Manage Compliments',
				list: dropdownListForCompliments,
			}}
			inquiries={{
				name: 'Inquiries',
				list: dropdownListForInquiries,
			}}
		>
			{contentExist ? props.children : <DashboardContent />}
		</DashboardLayout>
	);
};

export default AdminDashboard;
