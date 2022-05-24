import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from './add.module.css';

// start component

const AddCategory = props => {
	const [showAddCategoryForm, setShowAddCategory] = useState(false);
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
				toast.error('Category with that name already exists ❌');
				console.log(response);
				setShowAddCategory(false);
				return;
			}
			nameRef.current.value = '';
			setShowAddCategory(false);
			toast.success('Done, new category added successfully 💖🐱‍👤');
			props.onReload(true);
		});
	};
	return (
		<>
			<div className={`${classes.container1}`}>
				<button
					className="btn btn-danger text-center mb-4 mt-4 w-100 fw-bolder"
					onClick={toggleHandler}
				>
					Add Category
				</button>
				<ToastContainer theme='dark' />
				{showAddCategoryForm && (
					<div className={`${classes.container2}`}>
						<form onSubmit={submitHandler}>
							<label
								for="add"
								className={`form-label ${classes.formLabel} fw-bolder`}
							>
								Category Name
							</label>
							<input
								type="text"
								id="add"
								placeholder="type category name here ..."
								ref={nameRef}
								className={`form-control ${classes.addInput}`}
							/>
							<button
								className={`btn btn-danger text-center mb-4 mt-4  ${classes.submit}`}
							>
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
