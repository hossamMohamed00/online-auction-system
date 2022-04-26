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
// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = props => {
	const dropdownListForAdmin = [
		{ title: 'Profile', icon: faUser },
		{ title: 'Settings', icon: faGears },
		{ title: 'Inbox', icon: faMessage },
		{ title: 'Logout', icon: faPowerOff },
	];
	const dropdownListManageAuctions = [
		{ title: 'Current Auctions', icon: faGavel },
		{ title: 'Ongoing Auctions', icon: faGavel },
	];

	const dropdownListManageUsers = [
		{ title: 'Sellers', icon: faUser },
		{ title: 'Buyers', icon: faUser },
	];
	const dropdownListAuctionsRequests = [
		{ title: 'Pending auctions', icon: faTh },
	];
	const dropdownListManageCategories = [];

	return (
		<DashboardLayout
			admin={{ name: 'Safa Ramadan  ', list: dropdownListForAdmin }}
			users={{ name: 'Manage Users  ', list: dropdownListManageUsers }}
			auctions={{ name: 'Manage Auctions', list: dropdownListManageAuctions }}
			requests={{ name: 'Manage Requests   ', list: dropdownListAuctionsRequests }}
			categories={{ name: 'Manage Categories', list:dropdownListManageCategories}}
		>
			{props.children}
		</DashboardLayout>
	);
};

export default AdminDashboard;
