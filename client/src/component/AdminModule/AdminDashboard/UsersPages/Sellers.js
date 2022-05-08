import React from 'react';

import UsersLayout from './usersLayout/TableLayout';

const SellersPage = () => {
	const columNames = ['name', 'email', 'phone', 'Role', 'Edit'];

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

	return <UsersLayout columNames={columNames} users={users} title="Sellers" />;
};

export default SellersPage;
