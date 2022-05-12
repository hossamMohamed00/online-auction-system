import React from 'react';

import TableLayout from '../../../UI/TableLayout/TableLayout';

const SellersPage = () => {
	const columNames = ['name', 'email', 'phone', 'Role' ];

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

	return (
		<TableLayout
			columNames={columNames}
			records={{ name: users }}
			title="Sellers"
		/>
	);
};

export default SellersPage;
