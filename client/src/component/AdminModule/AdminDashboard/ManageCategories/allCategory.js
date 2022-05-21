import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useHttp from '../../../../CustomHooks/useHttp';
import { getAllCategoriesForAdmin } from './../../../../Api/Admin';
import classes from '../../../UI/TableLayout/table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AllCategories = () => {
	// const location = useLocation()
	// const categoryId = new URLSearchParams(location.search).get('id')
	const url = 'http://localhost:8000';
	const { sendRequest, status, data } = useHttp(getAllCategoriesForAdmin);
	const idToken = useSelector(store => store.AuthData.idToken);
	useEffect(() => {
		if (status === 'completed');
		sendRequest(idToken);
	}, [sendRequest]);

	const removeHandler = categoryId => {
		const result = window.confirm('Are you sure to delete this category ?');
		if (result) {
			fetch(`${url}/admin/category/${categoryId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${idToken}`,
					'content-type': 'application/json',
				},
			}).then(response => {
				if (!response.ok) {
					console.log('failed');
					return
				}
				alert('Deleted Successfully');
				window.location.reload(true)
			});
		}
	};

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
						<td className={`${classes.numberClasses}`}>10</td>
						<td>
							<button className={`${classes.editIcon} text-success `}>
								<FontAwesomeIcon icon={faEdit} />
							</button>
							<button
								className={`${classes.editIcon} text-danger`}
								onClick={() => removeHandler(item._id)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</button>
						</td>
					</tr>
				))}
		</table>
	);
};
export default AllCategories;
