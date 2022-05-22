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

	};
	return (
		<AdminDashboard>
			<PageContent>
				<h1>AddEmployee</h1>
				<div className={`${classes.container}`}>
					<form onSubmit={submitHandeler}>
						<div className="row">
							<div className='col-lg-6'>
								<label for="name" className='text-light'> Name </label>
								<Input
									type="name"
									placeholder="type your name"
									validateText={validateEmail}
									ref={nameRef}
									errorMassage="please enter your email"
									inputValue=""
									id="name"
								/>
							</div>
							<div className='col-lg-6'>
								<label for="password" className='text-light'> Password</label>
								<Input
								type="password"
								placeholder="type your Password"
								validateText={validatePassword}
								ref={passwordRef}
								id="password"
								errorMassage="please enter your password"
								/>
							</div>


						</div>
						<div className="w-50"></div>
					</form>
				</div>
			</PageContent>
		</AdminDashboard>
	);
}
