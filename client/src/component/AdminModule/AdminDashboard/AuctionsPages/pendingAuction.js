import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import TableLayout from '../../../UI/TableLayout/TableLayout';
import useHttp from '../../../../CustomHooks/useHttp';
import { getAllAuctions } from '../../../../Api/Admin';

const PendingAuctions = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest, status, data, error } = useHttp(getAllAuctions);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);
	const [pendingData, setPendingData] = useState([]);
	useEffect(() => {
		if (status === 'completed') {
			const pendingData = data.filter(data => data.status === 'pending');
			pendingData.map(data => {
				const newDate = moment(data.startDate).format(' DD / MM / YYYY');
				data.startDate = newDate;
			});
			setPendingData(pendingData);
		}
	}, [status]);

	const columNames = [
		'title',
		'basePrice',
		'startDate',
		'endDate',
		'seller',
		'status',
	];

	return (
		<TableLayout
			columNames={columNames}
			records={{ name: pendingData }}
			title="Pending Auctions "
			path="/adminDashboard/pendingAuctions"
		/>
	);
};

export default PendingAuctions;
