import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import TableLayout from '../../../UI/TableLayout/TableLayout';

const UsersPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);
	const columNames = ['name', 'email', 'role'];

	const { sendRequest, status, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest({ idToken: idToken, path: 'admin/users?role=seller' });
	}, [sendRequest]);

	const failed = status !== 'completed';
	console.log(failed);

	return (
		<React.Fragment>
			{data && (
				<TableLayout
					columNames={columNames}
					records={{ name: data }}
					title="Sellers"
					failed={failed}
				/>
			)}
		</React.Fragment>
	);
};

export default UsersPage;
