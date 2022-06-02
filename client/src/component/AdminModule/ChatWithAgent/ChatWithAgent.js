import React from 'react';
import { useLocation } from 'react-router-dom';
import Chat from '../../UI/Chat/Chat';

import AdminDashboard from '../AdminDashboard/home/adminDashboard';

const ChatWithAgent = () => {
	// const location = useLocation()
	// const SellerEmail = new URLSearchParams(location.search).get('email')
	return (
		<AdminDashboard>
			{/* <Chat SellerEmail={SellerEmail && SellerEmail} /> */}
			<Chat />

		</AdminDashboard>
	);
};

export default ChatWithAgent;
