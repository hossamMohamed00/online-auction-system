import React,{ useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import useHttp from '../../../../CustomHooks/useHttp';
import moment from 'moment';
import TableLayout from '../../../UI/TableLayout/TableLayout'
import { getAllAuctions } from '../../../../Api/Admin';



const CurrentAuctionsPage = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest, status, data, error } = useHttp(getAllAuctions);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);
	const [ongoingAuctions, setOngoingAuctions] = useState([]);
	useEffect(() => {
		if (status === 'completed') {
			const ongoingAuctions = data.filter(data => data.status === 'ongoing');
			ongoingAuctions.map(data => {
				const newStartDate = moment(data.startDate).format(' DD / MM / YYYY');
				const newEndDate = moment(data.endDate).format(' DD / MM / YYYY');

				data.startDate = newStartDate;
				data.endDate = newEndDate;
			});
			setOngoingAuctions(ongoingAuctions);
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
		records={{ name: ongoingAuctions }}
		title="Current Auctions "
		path=""
	/>
);
};

export default CurrentAuctionsPage;
