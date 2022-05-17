import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import TableLayout from '../../../UI/TableLayout/TableLayout';
import { getCurrentAuctions } from '../../../../Api/AuctionsApi';

const UsersPage = () => {
	const path = 'admin/users';
	const idToken = useSelector(store => store.AuthData.idToken);
	const columNames = ['name', 'email', 'role'];

	const { sendRequest, status, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);



	const failed = status !== 'completed';
	console.log(failed);

	return (
		<React.Fragment>
			{data && (
				<TableLayout
					columNames={columNames}
					records={{ name: data }}
					title="All Users"
					failed={failed}
				/>
			)}
		</React.Fragment>
	);
};

export default UsersPage;
