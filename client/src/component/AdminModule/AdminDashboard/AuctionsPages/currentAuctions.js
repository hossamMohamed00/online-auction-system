import React from 'react';
import TableLayout from '../../../UI/TableLayout/TableLayout'


const CurrentAuctionsPage = () => {
const columNames = ['Title', 'BasePrice', 'StartDate', 'EndDate' , 'Seller','Status'];

const Auctions = [
	{
		Title: 'Laptop',
		BasePrice: `5000 $`,
		StartDate: '15/5/2022',
		EndDate: '15/6/2022',
		Seller:'Safa Ramadan',
		Status: 'Accepted'
	},
];

return <TableLayout columNames={columNames} records={{name:Auctions}} title="Current Auctions " />;
};

export default CurrentAuctionsPage;
