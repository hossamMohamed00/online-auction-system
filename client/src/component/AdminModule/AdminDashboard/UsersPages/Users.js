import React from 'react';
// import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';

import UsersLayout from './usersLayout/TableLayout';

const UsersPage=()=> {

	const columNames = ['name' , 'email' , 'phone','Role' ,'Edit']

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
		<UsersLayout columNames={columNames} users={users} title='All Users'/>
	);
}

export default UsersPage;
