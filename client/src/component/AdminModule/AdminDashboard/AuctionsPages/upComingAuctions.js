import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useHttp from '../../../../CustomHooks/useHttp';
import moment from 'moment';
import TableLayout from '../../../UI/TableLayout/TableLayout';
import { getAllAuctions } from '../../../../Api/Admin';

const UpcomingAuctions = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest, status, data, error } = useHttp(getAllAuctions);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);
	const [upComingAuctions, setUpcomingAuctions] = useState([]);
	useEffect(() => {
		if (status === 'completed') {
			const upComingAuctions = data.filter(data => data.status === 'upcoming');
			upComingAuctions.map(data => {
			const newStartDate = moment(data.startDate).format(' DD / MM / YYYY');
			const newEndDate = moment(data.endDate).format(' DD / MM / YYYY');

			data.startDate = newStartDate;
			data.endDate = newEndDate;
			});
			setUpcomingAuctions(upComingAuctions);
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
			records={{ name: upComingAuctions }}
			title="Upcoming Auctions "
			path=""
		/>
	);
};

export default UpcomingAuctions;
