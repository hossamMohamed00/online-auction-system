import React from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '../../UI/Chat/Chat';

import BuyerDashboardContent from './BuyerDashboard';

const BuyerChat = () => {
	const location = useLocation()
	const SellerEmail = new URLSearchParams(location.search).get('email')
	return (
		<BuyerDashboardContent>
			<Chat SellerEmail={SellerEmail && SellerEmail}  />
		</BuyerDashboardContent>
	);
};

export default BuyerChat;
