import React from 'react';

import PageContent from '../DashboardLayout/Pagecontant/pageContent';
import AdminDashboard from '../../AdminModule/AdminDashboard/home/adminDashboard';
import classes from './table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TableLayout = props => {
	const userActions =
		props.records.name.length !== 0
			? Object.keys(props.records.name[0])[0] === 'name'
			: '';

	const dataExist = props.records.name.length !== 0;
	return (
		<React.Fragment>
			<AdminDashboard>
				<PageContent>
					<h1 className={`${classes.title} `}>{props.title}</h1>
					<div>
						{!dataExist && <p className="text-light">No data to show</p>}
						{dataExist && (
							<table
								className={`table table-dark table-sm  ${classes.usersTable}`}
							>
								<thead>
									<tr className="text-center">
										{props.columNames.map(name => (
											<td>{name}</td>
										))}
										<td>Actions</td>
									</tr>
								</thead>

								{props.records.name.map(record => {
									return (
										<tr className="text-center">
											{props.columNames.map(name => {
												return <td>{record[name]}</td>;
											})}
											{record && userActions && (
												<td>
													<a className={`text-success ${classes.editIcon}`}>
														<FontAwesomeIcon icon={faEdit} />
													</a>
													<a className={`text-danger ${classes.editIcon}`}>
														<FontAwesomeIcon icon={faXmark} />
													</a>
												</td>
											)}
											{!userActions && (
												<a
													className={`${classes.details} `}
													href="#"
												>
													More Details
												</a>
											)}
										</tr>
									);
								})}
							</table>
						)}
					</div>
				</PageContent>
			</AdminDashboard>
		</React.Fragment>
	);
};

export default TableLayout;
