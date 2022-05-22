import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../../CustomHooks/useHttp';
import { getEmployees } from '../../../../../Api/Admin';
import TableLayout from '../../../../UI/TableLayout/TableLayout';

 const ListAllEmployees = () => {

const idToken = useSelector(store => store.AuthData.idToken);
	const columNames = ['name', 'email', 'role'];

	const { sendRequest, status, data } = useHttp(getEmployees);

	useEffect(() => {
		sendRequest( idToken );
	}, [sendRequest]);



	const failed = status !== 'completed';
	console.log(failed);

	return (
		<React.Fragment>
			{data && (
				<TableLayout
					columNames={columNames}
					records={{ name: data }}
					title="All Employees"
					failed={failed}
				/>
			)}
		</React.Fragment>
	)

}

export default ListAllEmployees;