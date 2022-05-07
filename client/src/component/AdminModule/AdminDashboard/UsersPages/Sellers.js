import React from 'react';

import UsersLayout from './usersLayout/usersLayout'

const SellersPage = () => {
	const users = [
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'seller',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'seller',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'seller',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'seller',
		},
	];

	return <UsersLayout users={users} title="Sellers" />;
};

export default SellersPage;
