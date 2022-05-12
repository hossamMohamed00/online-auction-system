import React from 'react';
import TableLayout from '../../../UI/TableLayout/TableLayout';


const OngoingAuctionsPage = () => {
	const columNames = [
		'Title',
		'BasePrice',
		'StartDate',
		'EndDate',
		'Seller',
		'Status',
	];

	const Auctions = [
		{
			Title: 'Laptop',
			BasePrice: `5000 $`,
			StartDate: '15/5/2022',
			EndDate: '15/6/2022',
			Seller: 'Hossam Mohamed',
			Status: 'Coming Soon',
		},
	];

	return (
		<TableLayout
			columNames={columNames}
			records={{ name: Auctions }}
			title="Ongoing Auctions "
		/>
	);
};

export default OngoingAuctionsPage;
