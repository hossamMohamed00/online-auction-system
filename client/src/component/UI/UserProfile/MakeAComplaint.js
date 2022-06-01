import React, { useRef, useState } from 'react';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Modal_ from './../Modal/modal';
import './profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

export const MakeAComplaintModal = props => {
	const reason = useRef();
	const url = 'http://localhost:8000';
	const idToken = useSelector(store => store.AuthData.idToken);

	const [loading, setLoading] = useState(false);
	const ComplaintTitle = 'Add your compliant';
	const compliantBody = (
		<>
			<label for="add" className={`form-label formLabel fw-bolder`}>
				Reason
			</label>
			<input
				ref={reason}
				className="form-control formInput"
				type="text"
				placeholder="type your reason ..."
				id="add"
			/>
		</>
	);
	const addUserComplaintHandler = () => {
		const compliantData = {
			reason: reason.current.value,
			in: props.id && props.id,
		};

		let count = Math.random();
		fetch(`${url}/complaint/submit`, {
			method: 'POST',
			body: JSON.stringify(compliantData),
			headers: {
				Authorization: `Bearer ${idToken}`,
				'content-type': 'application/json',
			},
		}).then(response => {
			if (!response.ok) {
				console.log(response);
				return;
			}
			toast.success('Done, your complaint added successfully 💖🐱‍👤');

			// props.onHide();

			props.onReload(count);
		});
	};

	return (
		<>
			<ToastContainer theme="dark" />
			{loading && <LoadingSpinner />}

			<Modal_
				show={props.show}
				onHide={props.onHide}
				title={ComplaintTitle}
				body={compliantBody}
				btnName="Submit"
				btnHandler={addUserComplaintHandler}
			/>
		</>
	);
};
