import React ,{useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../UI/DashboardLayout/DashboardLayout';
// import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

import { faGavel } from '@fortawesome/free-solid-svg-icons';
import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';

// import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import useHttp from './../../../CustomHooks/useHttp';
import { getProfileData } from '../../../Api/Admin';

const SellerDashboardContent = props => {
const { sendRequest, data, status } = useHttp(getProfileData);
const idToken = useSelector(store => store.AuthData.idToken);
const [sellerId , setSellerId] = useState('');
useEffect(() => {
	sendRequest(idToken);

},[sendRequest])
useEffect(() => {

	if(status === 'completed'){
		setSellerId(data &&data._id);
	}
})

	const email = localStorage.getItem('email');

	const dropdownListProfile = [
		{
			title: 'View Info',
			icon: faGavel,
			path: `/seller?id=${sellerId}`,
		},
		{
			title: 'Edit Account',
			icon: faGavel,
			path: '/seller-dashboard/UpdateAccount',
		},
	];

	const dropdownListAuctions = [
		{
			title: 'My Auctions',
			icon: faGavel,
			path: '/seller-dashboard/viewAllAuctions',
		},
		{
			title: 'Extension Time Request',
			icon: faGavel,
			path: '/seller-dashboard/ExtendAuctionTime',
		},
		{
			title: 'Add New Auction',
			icon: faGavel,
			path: '/seller-dashboard/AddAuction',
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
