import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import TableLayout from '../../../UI/TableLayout/TableLayout';

const BuyersPage = () => {
	const columNames = ['name', 'email', 'phone', 'Role'];

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

	return (
		<TableLayout
			columNames={columNames}
			records={{ name: users }}
			title="Buyers"
		/>
	);
};

export default BuyersPage;
