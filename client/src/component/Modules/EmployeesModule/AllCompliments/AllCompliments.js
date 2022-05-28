import React from 'react'
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import AdminDashboard from './../../../AdminModule/AdminDashboard/home/adminDashboard';

 const AllCompliments = () => {
	return (
		<AdminDashboard>
			<PageContent>
				<PageHeader text='Compliments' showLink={false}></PageHeader>
			</PageContent>
		</AdminDashboard>
	)
}
export default AllCompliments