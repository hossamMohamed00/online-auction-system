import React from 'react';
// import DashboardLayout from '../../../UI/DashboardLayout/DashboardLayout';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import AdminDashboard from '../home/adminDashboard'
import classes from './users.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UsersPage=()=> {

	const users = [
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',
		},
		{
			name: 'hossam',
			email: 'hossam@gmail.com',
			phone: '01128803117',
			Role: 'admin',

		},
	];
	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<h1>All Users</h1>
					<div className='position-relative'>
						<table className={`table table-dark table-sm position-absolute ${classes.usersTable}`}>
							<thead>
								<tr className='text-center'>
									<td>Name</td>
									<td>Email</td>
									<td>Phone</td>
									<td>Role</td>
									<td>status</td>
									<td>Edit</td>

								</tr>
							</thead>
							{users.map(user =>{
								return (
									<tr className="text-center">
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<td>{user.Role}</td>
										<td>pending</td>
										<td>
											<a className={`text-success ${classes.editIcon}`}>
												<FontAwesomeIcon icon={faEdit} />
											</a>
											<a className={`text-danger ${classes.editIcon}`}>
												<FontAwesomeIcon icon={faXmark} />
											</a>
										</td>
									</tr>
								);
							}
							)}
						</table>
					 </div>
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
}

export default UsersPage;
