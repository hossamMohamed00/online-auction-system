import React from 'react';
import DashboardLayout from '../../UI/DashboardLayout/DashboardLayout';
// import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

import { faCommentDots, faGavel } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const BuyerDashboardContent = props => {

	const email = localStorage.getItem('email')

	console.log(email)

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
			title: 'View All Auctions',
			icon: faGavel,
			path: '/adminDashboard/currentAuctions',
		},
		{
			title: 'View Current Auctions',
			icon: faGavel,
			path: '/adminDashboard/ongoingAuctions',
		}
	];

	const dropdownListChat = [
		{
			title: 'View Chats',
			icon: faCommentDots,
			path: '/buyer-dashboard/chat',
		}
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
		}
	];
	const contentExist = props.children;
	console.log(contentExist)
	return (
		<DashboardLayout
			buyer					= {{ name: `${email}` }}
			profile				= {{ name: 'Profile', list: dropdownListProfile }}
			viewAuctions	= {{ name: 'View Auctions', list: dropdownListViewAuctions }}
			chat					= {{ name: 'Chat', list: dropdownListChat }}
			payment				= {{ name: 'Payment', list: dropdownListPayment }}

		>
			{contentExist ? (
				props.children
			) : (
				<PageContent>
					<h1> hello </h1>
				</PageContent>
			)}
		</DashboardLayout>
	);
};

export default BuyerDashboardContent;