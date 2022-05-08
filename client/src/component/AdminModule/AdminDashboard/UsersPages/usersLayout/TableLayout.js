import React from 'react';

import PageContent from '../../../../UI/DashboardLayout/Pagecontant/pageContent';
import AdminDashboard from '../../home/adminDashboard';
import classes from './table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TableLayout = props => {
	// const keys = Object.keys(props.users);
	// console.log(keys);
	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<h1>{props.title}</h1>
					<div>
						<table
							className={`table table-dark table-sm  ${classes.usersTable}`}
						>
							<thead>
								<tr className="text-center">
									{props.columNames.map(name => (
										<td>{name}</td>
									))}
								</tr>
							</thead>
							{/* <tr>
								{props.users.forEach(user => {
									for (let key in user) {
										// console.log(`${key}: ${user[key]}`);
										return <td>{`${key}: ${user[key]}`}</td>;
									}
								})}
							</tr> */}

							{props.columNames.map(name => {
								return props.users.map(user => {
									return (
										<tr className="text-center">
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td>{user.phone}</td>
											<td>{user.Role}</td>

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
								});
							})}
						</table>
					</div>
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};

export default TableLayout;
