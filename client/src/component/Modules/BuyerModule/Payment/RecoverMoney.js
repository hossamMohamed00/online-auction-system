import React from 'react';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import BuyerDashboardContent from '../BuyerDashboard';



function RecoverMoney() {
	return (
		<BuyerDashboardContent>
			<PageContent>
				<PageHeader text="Recover Money" showLink={false}/>
			</PageContent>
		</BuyerDashboardContent>
	);
}

export default RecoverMoney;