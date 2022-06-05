import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getAllComplaints } from '../../../../Api/Admin';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import AdminDashboard from './../../../AdminModule/AdminDashboard/home/adminDashboard';
import useHttp from './../../../../CustomHooks/useHttp';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faEnvelopeOpen,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ComplaintModal } from './ComplaintsModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// start component

const AllCompliments = () => {
	const url = 'http://localhost:8000';

	const idToken = useSelector(store => store.AuthData.idToken);
	const [isShownComplaintModal, setIsShownComplaintModal] = useState(false);
	const [reload, setReload] = useState('');
	const [Readable, setReadable] = useState(false);

	const [complaintReason, setComplaintReason] = useState('');
	const { sendRequest, status: statusForGet, data, error } = useHttp(
		getAllComplaints,
	);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'complaints',
		});
	}, [sendRequest, reload]);
	const [complaints, setComplaints] = useState([]);
	useEffect(() => {
		if (statusForGet === 'completed') {
			//*Format dates
			data.map(data => {
				const newDate = moment(data.createdAt).format(
					' ddd DD / MM [at] hh:mm a',
				);
				data.createdAt = newDate;
			});

			setComplaints(data);
		}
	}, [statusForGet]);
	// handle ComplaintModal
	const ComplaintHandler = (id, reason, status) => {
		console.log({ id, reason, status });

		setComplaintReason(reason && reason);
		console.log({ complaintReason });

		//* Display the modal
		setIsShownComplaintModal(true);

		if (!status) {
			//* Send request to change read property
			MarkAsRead(id);
			// setReload(Math.random());
		}
		// setReload(Math.random());
	};

	// handle read
	const MarkAsRead = complaintId => {
		let count = Math.random();
		fetch(`${url}/admin/complaints/${complaintId}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'content-type': 'application/json',
			},
		}).then(response => {
			if (!response.ok) {
				console.log(response);
				return;
			}
		});
		setReload(Math.random());
	};
	const deleteComplaint = complaintId => {
		let count = Math.random();
		fetch(`${url}/admin/complaints/${complaintId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'content-type': 'application/json',
			},
		}).then(response => {
			if (!response.ok) {
				console.log(response);
				return;
			}
			toast.success('Deleted Successfully 💖🐱‍👤');
			setReload(count);
		});
	};

	const columns = [
		{
			name: 'From',
			selector: row => row.from.name,
			sortable: true,
			center: true,
		},
		{
			name: 'In',
			selector: row => row.in && row.in.name,
			center: true,
			sortable: true,
		},
		{
			name: 'Date',
			selector: row => row.createdAt,
			center: true,
			sortable: true,
		},
		{
			name: 'Reason',
			selector: row => row.reason,
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<button
							className="btn text-light  btn_read"
							onClick={() =>
								ComplaintHandler(props._id, props.reason, props.markedAsRead)
							}
						>
							Read
						</button>
					</span>
				);
			},
		},
		{
			name: 'Status',
			center: true,
			sortable: true,
			cell: props => {
				console.log(props);
				return (
					<span className="text-info">
						{props.markedAsRead ? (
							<button className="btn btn-success" disabled>
								<FontAwesomeIcon icon={faEnvelopeOpen} />
							</button>
						) : (
							<button className="btn btn-success">
								<FontAwesomeIcon icon={faEnvelope} />
							</button>
						)}
					</span>
				);
			},
		},
		{
			name: 'Actions',
			center: true,
			cell: props => {
				return (
					<>
						<button
							className="btn btn-danger my-2 "
							onClick={() => deleteComplaint(props._id)}
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</>
				);
			},
		},
	];
	//filter
	const items = complaints ? complaints : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter

	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<ToastContainer theme="dark" />
					<PageHeader text="Complaints" showLink={false} />{' '}
					<DataTable
						columns={columns}
						data={filteredItems}
						subHeader
						subHeaderComponent={filterFun}
						theme="dark"
						pagination
					/>
					{isShownComplaintModal && (
						<ComplaintModal
							show={isShownComplaintModal}
							onHide={() => setIsShownComplaintModal(false)}
							complaintReason={complaintReason && complaintReason}
							onReload={value => setReload(value)}
						/>
					)}
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};
export default AllCompliments;
