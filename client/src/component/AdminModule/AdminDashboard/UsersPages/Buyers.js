import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import {
	faBan,
	faCircleExclamation,
	faCircleXmark,
	faGavel,
} from '@fortawesome/free-solid-svg-icons';

import BlockModal from '../../../UI/Modals/BlockModal';
import WarnModal from '../../../UI/Modals/WarnModal';
import { ToastContainer } from 'react-toastify';
import './users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JoinedAuctionModal from '../../../UI/Modals/JoinedAuctionModal';

const UsersPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const [isShownWarnModal, setIsShownWarnModal] = useState(false);
	const [isWarned, setIsWarned] = useState(false);

	const [isShownBlockModal, setIsShownBlockModal] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);

	const [isShownJoinAuctions, setIsShownJoinAuctions] = useState(false);

	// reload users table when warn or block user
	const [reload, setReload] = useState('');

	const [userId, setUserId] = useState('');

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
					<div className="text-info btn-actions">
						<button
							type="button"
							className="btn btn-warn my-2 px-1 text-light "
							onClick={() => warnHandler(props._id, props.isWarned)}
						>
							{props.isWarned ? (
								<>
									<FontAwesomeIcon icon={faCircleXmark} className="px-1" />
									<span className="RemoveBadge">Remove Warn </span>
								</>
							) : (
								// btn show when user is not warned
								<>
									<FontAwesomeIcon
										icon={faCircleExclamation}
										className="pe-1"
									/>
									Warn
								</>
							)}
						</button>
						<button
							type="button"
							className="btn bg-danger my-2 text-light btn-block "
							onClick={() => blockHandler(props._id, props.isBlocked)}
						>
							{props.isBlocked ? (
								<>
									<FontAwesomeIcon icon={faCircleXmark} />
									<span className="RemoveBadge"> UnBlock </span>
								</>
							) : (
								// btn show when user is not Blocked
								<>
									<FontAwesomeIcon icon={faBan} className="pe-1" />
									Block
								</>
							)}
						</button>
						<br></br>
						<button
							type="button"
							className="btn btn-primary btn-joinAuction mb-2 mt-0 px-3"
							onClick={() => joinAuctionsHandler(props._id)}
						>
							<FontAwesomeIcon icon={faGavel} className="px-2 f-4" />
							View Joined Auctions
						</button>
					</div>
				);
			},
		},
	];

	const { sendRequest, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'admin/users?role=buyer',
		});
	}, [sendRequest, reload]);

	// start warn handler
	const warnHandler = (id, isWarned) => {
		setUserId(id);
		setIsShownWarnModal(true);
		setIsWarned(isWarned);
	};
	// end warn handler

	// start block handler
	const blockHandler = (id, isBlocked) => {
		setUserId(id);
		setIsShownBlockModal(true);
		setIsBlocked(isBlocked);
	};
	// end block handler

	// start block handler
	const joinAuctionsHandler = id => {
		setUserId(id);
		setIsShownJoinAuctions(true);
	};
	// end block handler

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter

	return (
		<React.Fragment>
			<AdminDashboard>
				{/* show successful message for warn or block user  */}
				<ToastContainer theme="dark" />

				<PageContent>
					<PageHeader text="Buyers" showLink={false} />
					{data && (
						<DataTable
							selectableRows
							columns={columns}
							data={filteredItems}
							subHeader
							subHeaderComponent={filterFun}
							theme="dark"
							pagination
						/>
					)}
				</PageContent>

				{/* start warn modal */}
				{isShownWarnModal && (
					<WarnModal
						id={userId}
						show={isShownWarnModal}
						onHide={() => setIsShownWarnModal(false)}
						isWarned={isWarned}
						onReload={value => setReload(value)}
					/>
				)}
				{/* end warn modal */}

				{/* start Block modal */}
				{isShownBlockModal && (
					<BlockModal
						id={userId}
						show={isShownBlockModal}
						onHide={() => setIsShownBlockModal(false)}
						isBlocked={isBlocked}
						onReload={value => setReload(value)}
					/>
				)}
				{/* end Block modal */}

				{/* start Block modal */}
				{isShownJoinAuctions && (
					<JoinedAuctionModal
						id={userId}
						show={isShownJoinAuctions}
						onHide={() => setIsShownJoinAuctions(false)}
					/>
				)}
				{/* end Block modal */}
			</AdminDashboard>
		</React.Fragment>
	);
};

export default UsersPage;
