import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// end toast
import useHttp from '../../../../CustomHooks/useHttp';
import { getAllCategoriesForAdmin, remove } from './../../../../Api/Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
const AllCategories = props => {
	//! cols name
	const columns = [
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
			center: true,
		},
		{
			name: 'Number of Auctions',
			selector: row => row.num,
			center: true,
		},

		{
			name: 'Actions',
			selector: row => row.action,
			center: true,
			cell: props => {
				return (
					<>
						<button className="btn btn-success mx-1 my-2">
							<FontAwesomeIcon icon={faEdit} />
						</button>
						<button
							className="btn btn-danger my-2 "
							onClick={() => removeHandler(props._id)}
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</>
				);
			},
		},
	];
	const url = 'http://localhost:8000';
	const { sendRequest, status, data } = useHttp(getAllCategoriesForAdmin);
	// remove api
	const {
		sendRequest: sendRequestForRemove,
		status: statusForRemove,
	} = useHttp(remove);

	const [
		reloadWhenRemoveCategory,
		setReloadWhenRemoveCategory,
	] = React.useState('');
	// ! handle remove
	//
	const removeHandler = categoryId => {
		const result = window.confirm('Are you sure to delete this category ?');
		if (result) {
			sendRequestForRemove({
				path: `category/${categoryId}`,
				accessToken: idToken,
			});
		}
		setReloadWhenRemoveCategory(categoryId);
	};

	useEffect(() => {
		if (statusForRemove === 'completed') {
			toast.success('Deleted Successfully 💖🐱‍👤');
			// props.onReload(true);
		}
	}, [statusForRemove, reloadWhenRemoveCategory]);
	// ! end remove

	const idToken = useSelector(store => store.AuthData.idToken);
	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest, props.reload, reloadWhenRemoveCategory]);

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items);
	//end filter
	return (
		<>
			<ToastContainer theme="da" />
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
	);
};
export default AllCategories;
