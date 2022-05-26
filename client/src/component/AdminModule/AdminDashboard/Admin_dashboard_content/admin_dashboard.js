import React from 'react';
import PageHeader from '../../../UI/Page Header/pageHeader';
import './admin.css';
const AdminDashboardContent = () => {
	const cardTitlesForAuctions = [
		{
			name: 'Current Auctions',
			number: 10,
		},
		{
			name: '	Upcoming Auctions',
			number: 10,
		},
	];
	const cardTitlesForUsers = [
		{
			name: 'Sellers',
			number: 10,
		},
		{
			name: 'Buyers',
			number: 10,
		},
		{
			name: 'Employees',
			number: 10,
		},
	];
	return (
		<>
			<PageHeader text="Welcome back Admin" showLink={false} />
			<div className="container">
				<div className="card_container row">
					{cardTitlesForAuctions.map(card => {
						return (
							<>
								<div className="col-lg-5 fw-bolder text-center  card_1 mx-2 h-100 mb-3">
									{card.name}
									<h3 className="text-center text-danger mt-2 fw-border">
										{card.number}
									</h3>
								</div>
							</>
						);
					})}
				</div>
				<div className="card_container mt-3 row">
					{cardTitlesForUsers.map(card => {
						return (
							<>
								<div className="col-lg-3 fw-bolder text-center  card_2 mx-2 h-100 mb-3">
									{card.name}
									<h3 className="text-center text-danger mt-2 fw-border">{card.number}</h3>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};
export default AdminDashboardContent;
