import React from 'react';
import AdminDashboard from '../home/adminDashboard';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import AddCategory from './AddCategory';
import AllCategories from './allCategory';
import PageHeader from '../../../UI/Page Header/pageHeader';


const ManageCategories = () => {
	const [showNewCategory, setShowNewCategory] = React.useState(false);

	const ReloadTableHandler = value => {
		setShowNewCategory(value);
	};
	return (
		<AdminDashboard>
			<PageContent >

				<PageHeader text="Manage Categories" showLink={false} />

				<AddCategory onReload={ReloadTableHandler} />
				<AllCategories reload={showNewCategory} onReload={ReloadTableHandler} />
			</PageContent>
		</AdminDashboard>
	);
};
export default ManageCategories;
