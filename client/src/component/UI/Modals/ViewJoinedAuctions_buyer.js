import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useHttp from '../../../CustomHooks/useHttp';

import ModalUi from '../Modal/modal'
import LoadingSpinner from '../Loading/LoadingSpinner'
import './WarnModal.css'
import { getJoinedAuctions } from '../../../Api/BuyerApi';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import useFilter from '../TableLayout/FilteringTable/filter';

const JoinedAuctionModal = ({id , show , onHide }) => {

	const { sendRequest, status, data , error } = useHttp(getJoinedAuctions);
	const [loading , setLoading] = useState(false)

	const ModalTitle = 'View Joined Auctions '

	// start get all Joined Actions
	useEffect(()=>{
		sendRequest(id)
	},[sendRequest])


	useEffect(()=>{
		if(status==='error' ){
			setLoading(false)
			toast.error(error)
		}
	},[status])

	useEffect(()=>{
		if(status==='completed' ){
			console.log(data.joinedAuctions[0])
		}
	},[status])
	// end get all Joined Actions



	const columns = [
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
			center: true,
		},
		{
			name: 'Base Price',
			selector: row => row.basePrice,
			center: true,
		},
		{
			name: 'Status',
			selector: row => row.status,
			center: true,
		},
		{
			name: 'Category',
			// selector: row => row.category.name,
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link to={`/categories?id=${props.category._id}`}>{props.category.name}</Link>
					</span>
				);
			},
		},
		{
			name: 'Winning Buyer',
			selector: row => row.winningBuyer ? row.winningBuyer :  'not selected',
			center: true,
		},
		{
			name: 'Seller',
			center: true,
			cell: props => {
				return (
					<span className="text-info">
						<Link to={`/sellerProfile?id=${props.seller._id}`}>{props.seller.name} </Link>
					</span>
				);
			}
		},
		{
			name: 'View Details',
			cell: props => {
				return (
					<span className="text-info ">
						<Link to={`/auctions?id=${props._id}`} >Auction Details</Link>
					</span>
				);
			},
		},
	];

	const items = data ? data.joinedAuctions : [];
	const { filterFun, filteredItems } = useFilter(items, 'title');

	// start View Joined Auctions
	const ViewJoinedAuctions = data && status==='completed' ? (
		<DataTable
			selectableRows
			columns={columns}
			data={filteredItems}
			subHeader
			subHeaderComponent={filterFun}
			theme="dark"
			pagination
		/>)
		// <h6 className='fw-bold text-center text-danger'> No Joined Auctions Now </h6>
	: <h6 className='fw-bold text-center text-danger'> No Joined Auctions Now </h6>

	// end View Joined Auctions

	return (
		<>
			{loading && <LoadingSpinner/>}

			<ModalUi
				show={show}
				onHide={onHide}
				title= {ModalTitle}
				body={ViewJoinedAuctions}
				btnName=''
				className='JoinedAuctionModal'
			/>
		</>
	);
}

export default JoinedAuctionModal;