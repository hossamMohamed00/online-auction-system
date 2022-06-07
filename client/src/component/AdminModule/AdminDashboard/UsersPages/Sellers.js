import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import './users.css';
import { Link } from 'react-router-dom';

const UsersPage = props => {
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
			cell: props => {
				return (
					<span className="text-info">
						{/*  props._id */}
						<Link to={`/seller?id=${props._id}`}>User Profile</Link>
					</span>
				);
			},
		},
	];

	const { sendRequest, status, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'admin/users?role=seller',
		});
	}, [sendRequest]);

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter

	const failed = status !== 'completed';

	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<PageHeader text="Sellers" showLink={false} />{' '}
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
