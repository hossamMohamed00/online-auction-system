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
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { ComplaintModal } from './ComplaintsModal';

const AllCompliments = () => {
	const url = 'http://localhost:8000';

	const idToken = useSelector(store => store.AuthData.idToken);
	const [isShownComplaintModal, setIsShownComplaintModal] = useState(false);

	const [complaintReason, setComplaintReason] = useState('');
	const { sendRequest, status: statusForGet, data, error } = useHttp(
		getAllComplaints,
	);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'complaints',
		});
	}, [sendRequest]);
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
		}
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
			// toast.success('Done, your complaint added successfully 💖🐱‍👤');
		});
	};

	const columns = [
		{
			name: 'BuyerName',
			selector: row => row.from.name,
			sortable: true,
			center: true,
		},
		{
			name: 'SellerName',
			selector: row => row.in.name,
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
							className="btn btn-danger"
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
			cell: props => {
				return (
					<span className="text-info">
						{!props.markedAsRead && (
							<button className="btn btn-success">
								<FontAwesomeIcon icon={faEnvelope} />
							</button>
						)}
						{props.markedAsRead && (
							<button className="btn btn-success" disabled>
								<FontAwesomeIcon icon={faEnvelopeOpen} />
							</button>
						)}
					</span>
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
						/>
					)}
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};
export default AllCompliments;
