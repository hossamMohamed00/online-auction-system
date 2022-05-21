import React, { useRef } from 'react';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import AdminDashboard from '../home/adminDashboard';
import Input from '../../../UI/Input/input';
import classes from './addEmployee.module.css'

export default function AddEmployee() {
	const nameRef = useRef();
	const passwordRef = useRef();

	const validateEmail = value => value.trim().includes('@');
	const validatePassword = value => value.trim().length > 4;
	const submitHandeler = e => {
		e.preventDefault();
		// const userDetails = {
		// 	email: nameRef.current.value,
		// 	password: passwordRef.current.value,
		// 	idToken,
		// };
		// sendRequest(userDetails);
	};
	return (
		<AdminDashboard>
			<PageContent>
				<h1>AddEmployee</h1>
				<div className={`${classes.container}`}>
					<form onSubmit={submitHandeler}>
						<div className="d-flex justify-content-between">
							<label>E-mail</label>
							<Input
								type="email"
								placeholder="Email"
								validateText={validateEmail}
								ref={nameRef}
								errorMassage="please enter your email"
								inputValue=""
							/>
							<Input
								type="password"
								placeholder="Password"
								validateText={validatePassword}
								ref={passwordRef}
							/>
						</div>
						<div className="w-50"></div>
					</form>
				</div>
			</PageContent>
		</AdminDashboard>
	);
}
