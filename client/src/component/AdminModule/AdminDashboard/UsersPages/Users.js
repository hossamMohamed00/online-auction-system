import React from 'react';
// import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';

import UsersLayout from './usersLayout/usersLayout';

const UsersPage=()=> {

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
		<UsersLayout users={users} title='All Users'/>
	);
}

export default UsersPage;
