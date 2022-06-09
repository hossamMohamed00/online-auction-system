import React, { useEffect , useState} from 'react';

import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';

import classes from './ViewParticipatingAuctions.module.css';

import BuyerDashboardContent from '../BuyerDashboard';
import { getJoinedAuctions } from '../../../../Api/BuyerApi';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import useFilter from '../../../UI/TableLayout/FilteringTable/filter';

import moment from 'moment';

const ViewJoinedAuctions_buyer = () => {
	const { sendRequest, status, data , error} = useHttp(getJoinedAuctions);

	const idToken = useSelector(store => store.AuthData.idToken);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);

	const [myAuctions, setMyAuctions] = useState([]);
	useEffect(() => {
		if (status === 'completed') {
			//*Format dates
			console.log(data.joinedAuctions)
			setMyAuctions(data);
		}
		if(status === 'error'){
			console.log(error)
		}
	}, [status]);


	const columns = [
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
			center: true,
		},
		{
			name: 'Last Bid ',
			selector: row => row.currentBid ? row.currentBid : 0 ,
			center: true,
		},
		{
			name: 'Num Of Bids ',
			selector: row => row.numOfBids,
			center: true,
		},
		{
			name: 'End Date',
			selector: row => row.status!=='closed' ? moment(row.endDate).format('LLL') : 'Auction-Ended',
			center: true,
		},
		{
			name: 'Status',
			selector: row => row.status,
			center: true,
		},
		{
			name: 'Winner',
			selector: row => row.winningBuyer && row.winningBuyer.name ? row.winningBuyer.name : 'not Selected',
			center: true,
		},
		{
			name: 'Actions',
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link to={`/auctions?id=${props._id}`}> {props.status!=='closed' ? 'Go To Auction Room'  : 'Auction Details' }</Link>
					</span>
				);
			},
		},
	];

//filter
const items = myAuctions ? myAuctions.joinedAuctions : [];
// const { filterFun, filteredItems } = useFilter(items, 'title');
//end filter

return (
	<React.Fragment>
		<BuyerDashboardContent>
			<PageContent>
				<PageHeader text="View Joined Auctions" showLink={false} />{' '}
				{myAuctions && (
					<DataTable
						columns={columns}
						data={items}
						// subHeader
						// subHeaderComponent={filterFun}
						theme="dark"
						pagination
					/>
				)}
			</PageContent>
		</BuyerDashboardContent>
	</React.Fragment>
);

};

export default ViewJoinedAuctions_buyer;
