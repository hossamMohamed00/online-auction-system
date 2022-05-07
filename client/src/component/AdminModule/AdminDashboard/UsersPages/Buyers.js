import React from 'react';

import UsersLayout from './usersLayout/usersLayout';

const SellersPage = () => {
	const users = [
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'buyer',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'buyer',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'buyer',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'buyer',
		},
	];

	return <UsersLayout users={users} title="Buyers" />;
};

export default SellersPage;
