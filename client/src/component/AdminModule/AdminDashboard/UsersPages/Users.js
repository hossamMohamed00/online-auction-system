import React from 'react';
// import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';

import TableLayout from '../../../UI/TableLayout/TableLayout';

const UsersPage=()=> {

	const columNames = ['name' , 'email' , 'phone','Role' ]

	const users = [
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',

		},
	];
	return (
		<TableLayout
			columNames={columNames}
			records={{ name: users }}
			title="All Users"
		/>
	);
}

export default UsersPage;
