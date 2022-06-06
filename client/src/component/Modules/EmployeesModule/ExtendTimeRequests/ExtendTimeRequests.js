import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { ApproveExtend, getAllExtendTimeRequests, rejectExtend } from '../../../../Api/Admin';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import AdminDashboard from '../../../AdminModule/AdminDashboard/home/adminDashboard';
import useHttp from '../../../../CustomHooks/useHttp';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './extend.css';
import ModalUi from '../../../UI/Modal/modal';
// start component

const ExtendTimeRequests = () => {
	const url = 'http://localhost:8000';

	const idToken = useSelector(store => store.AuthData.idToken);
	const [isShownRejectModal, setIsShownRejectModal] = useState(false);
	const [reload, setReload] = useState('');

	const [rejectReason, setRejectReason] = useState('');
	const { sendRequest, status: statusForGet, data } = useHttp(
		getAllExtendTimeRequests,
	);
	const {
		sendRequest: sendRequestForReject,
		status: statusForReject,
		data: dataForReject,
		error,
	} = useHttp(rejectExtend);
	const {
		sendRequest: sendRequestFoApprove,
		status: statusForApprove,
		data: dataForApprove,
	} = useHttp(ApproveExtend);

	// get request for all extend time requests
	useEffect(() => {
		console.log(idToken);
		sendRequest(idToken);
	}, [sendRequest, reload]);
	const [requests, setRequests] = useState([]);

	//  end get request for all extend time requests

	// handle reject modal
	const reasonRef = useRef();
	const [auctionId, setAuctionId] = useState('');
	const modalTitle = 'Reject Reason';
	const modalBody = (
		<>
			<label for="reason" className="text=light">
				Reason
			</label>

			<input
				type="text"
				ref={reasonRef}
				id="reason"
				className="form-control formInput"
			/>
		</>
	);

	const showRejectModal = id => {
		console.log('hiiiiiiiiiiiii');
		setIsShownRejectModal(true);
		setAuctionId(id);
	};

	// end modal
	const approveHandler = id => {
		console.log('Token is ', idToken);
		sendRequestFoApprove({ idToken, id });
	};
	const rejectHandler = id => {
		const rejectionData = { message: reasonRef.current.value };
		sendRequestForReject({
			idToken: idToken,
			id: id,
			rejectionData: rejectionData,
		});
	};

	//
	useEffect(() => {
		if (statusForGet === 'completed') {
			//*Format dates
			data.map(data => {
				const newDate = moment().to(data.endDate);
				data.endDate = newDate;
				const newExtensionTime =
					data.extensionTime.days +
					' d ' +
					'' +
					data.extensionTime.hours +
					'' +
					' h' +
					'' +
					data.extensionTime.minutes +
					'' +
					'm';
				data.extensionTime = newExtensionTime;
			});

			setRequests(data);
		}

		if (statusForApprove === 'completed') {
			toast.success('Extend time request approved successfully');
			setReload(Math.random());
		} else {
			toast.error('failed to approve extend time request');
		}
		console.log(statusForReject);
		if (!error ) {
			toast.success('Extend time request rejected successfully');
			setReload(Math.random());
		} else {
			toast.error('failed to reject extend time request');
		}
	}, [statusForGet]);
	// table columns

	const columns = [
		{
			name: 'From',
			selector: row => row.seller.name,
			sortable: true,
			center: true,
			cell: props => {
				return (
					<Link
						to={`/seller?id=${props.seller._id}`}
						className=" text-decoration-none my-0"
					>
						{props.seller.name}
					</Link>
				);
			},
		},
		{
			name: 'Auction',
			selector: row => row._id,
			sortable: true,
			center: true,
			cell: props => {
				return (
					<Link
						to={`/auctions?id=${props._id}`}
						className=" text-decoration-none my-0"
					>
						AuctionDetails
					</Link>
				);
			},
		},

		{
			name: 'EndDate     ',
			selector: row => row.endDate,
			center: true,
			sortable: true,
		},
		{
			name: 'ExtensionTime',
			selector: row => row.extensionTime,
			center: true,
		},

		{
			name: 'Actions',
			center: true,
			cell: props => {
				return (
					<>
						<button
							className="btn btn-success mx-2"
							onClick={() => approveHandler(props._id)}
						>
							<FontAwesomeIcon icon={faCheck} />
						</button>
						<button
							className="btn btn-danger  "
							onClick={() => {
								console.log('Clicked');
								return showRejectModal(props._id);
							}}
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</>
				);
			},
		},
	];
	//filter
	const items = requests ? requests : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter

	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<ToastContainer theme="dark" />
					<PageHeader text="Extend Requests" showLink={false} />{' '}
					<DataTable
						columns={columns}
						data={filteredItems}
						subHeader
						subHeaderComponent={filterFun}
						theme="dark"
						pagination
					/>
					{isShownRejectModal && (
						<ModalUi
							show={isShownRejectModal}
							onHide={() => setIsShownRejectModal(false)}
							title={modalTitle}
							body={modalBody}
							btnName="Reject"
							btnHandler={()=>rejectHandler(auctionId)}
							onReload={value => setReload(value)}
						/>
					)}
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};
export default ExtendTimeRequests;
