import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../../../../CustomHooks/useHttp';
import { getAllCategoriesForAdmin } from './../../../../Api/Admin';
import classes from '../../../UI/TableLayout/table.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AllCategories = () => {
		const url = 'http://localhost:8000';
	const { sendRequest, status, data } = useHttp(getAllCategoriesForAdmin);
	const idToken = useSelector(store => store.AuthData.idToken);
	useEffect(() => {
		if(status === 'completed');
		sendRequest(idToken);
	}, [sendRequest]);

	const removeHandler =()=>{
		fetch(`${url}/admin/category/${data.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'content-type': 'application/json',
			},
		}).then(response => {
			if (!response.ok) {
				console.log(response.error);
			}
		});
	}

	// columNames = ['name'];
	return (
		<table className={`table table-dark text-center ${classes.usersTable}`}>
			<thead>
				<tr>
					<td>Name</td>
					<td>Number of auctions</td>
					<td>Actions</td>
				</tr>
			</thead>
			{data &&
				data.map(item => (
					<tr className="fw-bold">
						<td>{item.name}</td>
						<td>10</td>
						<td>
							<button className={`${classes.editIcon} text-success `}>
								<FontAwesomeIcon icon={faEdit} />
							</button>
							<button className={`${classes.editIcon} text-danger`} onClick={removeHandler}>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</td>
					</tr>
				))}
		</table>
	);
};
export default AllCategories;
