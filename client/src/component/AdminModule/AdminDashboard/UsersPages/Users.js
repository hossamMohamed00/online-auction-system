import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';

const UsersPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);
	const columns = [
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'E-mail',
			selector: row => row.email,
		},
		{
			name: 'Role',
			selector: row => row.role,
		},
		{
			name: 'Actions',
			selector: row => row.action,
		},
	];


	const { sendRequest, status, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'admin/users',
		});
	}, [sendRequest]);

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items);
	//end filter

	const failed = status !== 'completed';
	console.log(failed);

	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<h1 className="mt-4 mb-4 ">All Users</h1>
					{data && (
						<DataTable
							// selectableRows
							columns={columns}
							data={filteredItems}
							subHeader
							subHeaderComponent={filterFun}
							theme="dark"
							pagination
						/>
					)}
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};

export default UsersPage;
