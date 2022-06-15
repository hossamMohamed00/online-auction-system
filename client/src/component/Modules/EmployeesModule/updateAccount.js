import React from 'react';
import AdminDashboard from '../../AdminModule/AdminDashboard/home/adminDashboard';


import UpdateAccountForUsers from './../../UI/UpdateAccount/UpdateAccount';

const UpdateAccountForEmployee = () => {
	console.log('UpdateAccountForEmployee');
	return (
		<>
			<AdminDashboard>
				<UpdateAccountForUsers />
			</AdminDashboard>
		</>
	);
};

export default UpdateAccountForEmployee;
