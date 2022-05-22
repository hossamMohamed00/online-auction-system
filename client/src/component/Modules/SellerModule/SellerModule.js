import React from 'react';
import DashboardLayout from '../../UI/DashboardLayout/DashboardLayout';
// import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

import { faCommentDots, faGavel } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const SellerDashboardContent = props => {
	const email = localStorage.getItem('email');

	console.log(email);

	const dropdownListProfile = [
		{
			title: 'View Info',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
		{
			title: 'Edit Account',
			icon: faGavel,
			path: '/adminDashboard/ongoingAuctions',
		},
		{
			title: 'Change Password',
			icon: faGavel,
			path: '/adminDashboard/ongoingAuctions',
		},
	];

	const dropdownListAuctions = [
		{
			title: 'My Auctions',
			icon: faGavel,
			path: '/seller-dashboard/viewAllAuctions',
		},
		{
			title: 'Add New Auction',
			icon: faGavel,
			path: '/adminDashboard/ongoingAuctions',
		},
	];

	const dropdownListPayment = [
		{
			title: 'Charge Wallet ',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
		{
			title: 'Recover Money',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
		{
			title: 'Display Wallet Info',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
	];

	const dropdownListChat = [
		{
			title: 'View Chat ',
			icon: faGavel,
			path: '/seller-dashboard/chat',
		},

	];

	const contentExist = props.children;

	return (
		<DashboardLayout
			seller={{ name: `${email}` }}
			profile={{ name: 'Profile', list: dropdownListProfile }}
			viewAuctions={{ name: 'Auctions', list: dropdownListAuctions }}
			payment={{ name: 'Payment', list: dropdownListPayment }}
			SellerChat={{ name: 'SellerChat', list: dropdownListChat }}


		>
			{contentExist ? (
				props.children
			) : (
				<PageContent>
					<h1> hello Seller </h1>
				</PageContent>
			)}
		</DashboardLayout>
	);
};

export default SellerDashboardContent;
