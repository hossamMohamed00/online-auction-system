import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './add.module.css';
const AddCategory = () => {
	const [showAddCategoryForm, setShowAddCategory] = useState(false);
	const [successMessage, setMessage] = useState('');
	const [failedMessage, setFailedMessage] = useState('');
	const idToken = useSelector(store => store.AuthData.idToken);
	const url = 'http://localhost:8000';
	const nameRef = useRef();
	const toggleHandler = () => {
		setShowAddCategory(!showAddCategoryForm);
	};

	const submitHandler = e => {
		e.preventDefault();
		fetch(`${url}/admin/category/`, {
			method: 'POST',
			body: JSON.stringify({ name: nameRef.current.value }),
			headers: {
				Authorization: `Bearer ${idToken}`,
				'content-type': 'application/json',
			},
		}).then(response => {
			if (!response.ok) {
				setFailedMessage(response.error)
				console.log(response.error);
			}
			nameRef.current.value = '';
			setShowAddCategory(false);
			setMessage('Added Successfully');
		});
	};
	return (
		<>
			<div className={`${classes.container1}`}>
				<h3 className="text-center text-success mt-4 fw-bold">
					{successMessage ? successMessage : failedMessage}
				</h3>
				<button
					className="btn btn-danger text-center mb-4 mt-4 w-100 fw-bolder"
					onClick={toggleHandler}
				>
					Add Category
				</button>
				{showAddCategoryForm && (
					<div className={`${classes.container2}`}>
						<form onSubmit={submitHandler}>
							<label for="add" className={`form-label ${classes.formLabel} fw-bolder`}>
								Category Name
							</label>
							<input
								type="text"
								id="add"
								placeholder="type category name here ..."
								ref={nameRef}
								className={`form-control`}
							/>
							<button className={`btn btn-danger text-center mb-4 mt-4  ${classes.submit}`}>
								Submit
							</button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};
export default AddCategory;
