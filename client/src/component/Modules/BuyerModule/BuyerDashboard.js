import React from 'react';
import DashboardLayout from '../../UI/DashboardLayout/DashboardLayout';
// import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

import {
	faCoins,
	faCommentDots,
	faCreditCardAlt,
	faGavel,
} from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';
import BuyerProfile from './buyerProfile/buyerProfile';

// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const BuyerDashboardContent = props => {
	const email = localStorage.getItem('email');

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

	const dropdownListViewAuctions = [
		{
			title: 'View Saved Auctions',
			icon: faGavel,
			path: '/buyer-dashboard/saved-auctions',
		},
		{
			title: 'View Participating Auctions',
			icon: faGavel,
			path: '/buyer-dashboard/participating-auctions',
		},
	];

	const dropdownListChat = [
		{
			title: 'View Chats',
			icon: faCommentDots,
			path: '/buyer-dashboard/chat',
		},
	];

	const dropdownListPayment = [
		{
			title: 'Charge Wallet ',
			icon: faCoins,
			path: '/buyer-dashboard/chargeWallet',
		},
		{
			title: 'Display Wallet Transactions',
			icon: faCreditCardAlt,
			path: '/buyer-dashboard/viewWalletTransaction',
		},
	];
	const contentExist = props.children;
	return (
		<DashboardLayout
			buyer={{ name: `${email}` }}
			profile={{ name: 'Profile', list: dropdownListProfile }}
			viewAuctions={{ name: 'View Auctions', list: dropdownListViewAuctions }}
			chat={{ name: 'Chat', list: dropdownListChat }}
			payment={{ name: 'Payment', list: dropdownListPayment }}
		>
			{contentExist ? props.children : <h1> hello buyer</h1>}
		</DashboardLayout>
	);
};

export default BuyerDashboardContent;
