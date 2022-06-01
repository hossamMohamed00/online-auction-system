import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getUsers } from '../../../../Api/usersApi';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import WarnModal from '../../../UI/Modals/WarnModal';
import {ToastContainer} from 'react-toastify'

import './users.css';
import BlockModal from '../../../UI/Modals/BlockModal';

const UsersPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);
	const [isShownWarnModal , setIsShownWarnModal ] = useState(false)
	const [isWarned , setIsWarned] = useState(false)

	const [isShownBlockModal , setIsShownBlockModal ] = useState(false)
	const [isBlocked , setIsBlocked] = useState(false)


	// reload users table when warn or block user
	const [reload , setReload] = useState('')

	const [userId , setUserId ] = useState('')

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
			hyperlink: true,
			cell: props => {
				return (
					<span className="text-info">
						<button type='button' className='btn btn-warn my-1 px-1 text-light ' onClick={() => warnHandler(props._id , props.isWarned)}>
							{props.isWarned ?
								<>
									<FontAwesomeIcon icon={faCircleXmark} className ="px-1" />
									<span className='RemoveBadge'>Remove Warn </span>
								</>
								// btn show when user is not warned
								:
								<>
									<FontAwesomeIcon icon={faCircleExclamation} className ="pe-1" />
									Warn
								</>
							}
						</button>
						<button type='button' className='btn bg-danger my-1 px-1 text-light btn-block ' onClick={() => blockHandler(props._id , props.isBlocked)}>
							{props.isBlocked ?
								<>
									<FontAwesomeIcon icon={faCircleXmark} className ="px-1" />
									<span className='RemoveBadge'> Un Block </span>
								</>
								// btn show when user is not Blocked
								:
								<>
									<FontAwesomeIcon icon={faCircleExclamation} className ="pe-1" />
									Block
								</>
							}
						</button>
						<br></br>
						{/* <button type='button' > View Joined Auctions </button> */}

					</span>
				);
			},
		},
	];


	// start warn handler
	const warnHandler = (id,isWarned) => {
		setUserId(id)
		setIsShownWarnModal(true)
		setIsWarned(isWarned)
	}
	// end warn handler


	// start block handler
	const blockHandler = (id,isBlocked) => {
		setUserId(id)
		setIsShownBlockModal(true)
		setIsBlocked(isBlocked)
	}
	// end block handler


	const { sendRequest, status, data } = useHttp(getUsers);

	useEffect(() => {
		sendRequest({
			idToken: idToken,
			path: 'admin/users',
		});
	}, [sendRequest,reload]);


	// filter data
	const filteredData = data && data.filter(item => item.role !== 'employee');
	//filter
	const items = filteredData ? filteredData : [];
	console.log(items && items);
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter

	const failed = status !== 'completed';

	return (
		<React.Fragment>
			<AdminDashboard>
				{/* show successful message for warn or block user  */}
				<ToastContainer theme="dark" />

				<PageContent>
					<PageHeader text="All users" showLink={false} />
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

				{/* start warn modal */}
				{isShownWarnModal && <WarnModal id={userId} show={isShownWarnModal} onHide={()=>setIsShownWarnModal(false)} isWarned={isWarned} onReload= {(value)=>setReload(value)} /> }
				{/* end warn modal */}

				{/* start Block modal */}
				{isShownBlockModal && <BlockModal id={userId} show={isShownBlockModal} onHide={()=>setIsShownBlockModal(false)} isBlocked={isBlocked} onReload= {(value)=>setReload(value)} /> }
				{/* end Block modal */}
			</AdminDashboard>
		</React.Fragment>
	);
};

export default UsersPage;
