import React, { useEffect, useState } from 'react';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// end toast
import { useSelector } from 'react-redux';
import useHttp from '../../../../../CustomHooks/useHttp';
import { getEmployees, remove } from '../../../../../Api/Admin';
import useFilter from '../../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../../home/adminDashboard';
import PageContent from '../../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../../UI/Page Header/pageHeader'
import './allEmployees.css';
// import { Link } from 'react-router-dom';

// font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ListAllEmployees = props => {
	const idToken = useSelector(store => store.AuthData.idToken);
	const [reloadData, setReloadData] = useState(false);

	const { sendRequest, status, data } = useHttp(getEmployees);

	const {
		sendRequest: sendRequestForRemove,
		status: statusForRemove,
	} = useHttp(remove);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest, reloadData]);

	const removeHandler = employeeId => {
		const result = window.confirm('Are you sure to delete this category ?');
		if (result) {
			sendRequestForRemove({
				path: `employee/${employeeId}`,
				accessToken: idToken,
			});
			setReloadData(true);
		}
	};

	useEffect(() => {
		if (statusForRemove === 'completed') {
			console.log('deleted');
			toast.success('Deleted Successfully 💖🐱‍👤');
			// props.onReload(true);
		}
	}, [statusForRemove]);

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
					<PageHeader text="Employees" showLink={false}/>
					<ToastContainer theme="dark" />
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

export default ListAllEmployees;
