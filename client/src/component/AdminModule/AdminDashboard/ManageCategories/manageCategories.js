import React from 'react'
import AdminDashboard from '../home/adminDashboard'
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent'
import AddCategory from './AddCategory'
import AllCategories from './allCategory'

 const ManageCategories =() =>{
	return (
		<AdminDashboard>
			<PageContent>
				<h1>ManageCategories</h1>
				<AddCategory/>
				<AllCategories/>
			</PageContent>
		</AdminDashboard>
	)
}
export default ManageCategories;