import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useHttp from '../../../../CustomHooks/useHttp';
import { getAllCategoriesForAdmin } from './../../../../Api/Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
const AllCategories = () => {
	const url = 'http://localhost:8000';
	const { sendRequest, status, data } = useHttp(getAllCategoriesForAdmin);
	const columns = [
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
		},
		{
			name: 'Number of Auctions',
			selector: row => row.num,
		},

		{
			name: 'Actions',
			selector: row => row.action,
		},
	];
	const idToken = useSelector(store => store.AuthData.idToken);
	useEffect(() => {
		if (status === 'completed');
		sendRequest(idToken);
	}, [sendRequest]);

	const removeHandler = categoryId => {
		const result = window.confirm('Are you sure to delete this category ?');
		if (result) {
			fetch(`${url}/admin/category/${categoryId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${idToken}`,
					'content-type': 'application/json',
				},
			}).then(response => {
				if (!response.ok) {
					console.log('failed');
					return;
				}
				alert('Deleted Successfully');
				window.location.reload(true);
			});
		}
	};

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items);
	//end filter
	return (
		<>
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
		</>

	)
};
export default AllCategories;
