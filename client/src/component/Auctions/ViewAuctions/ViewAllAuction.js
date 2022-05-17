import React, { useEffect, useState } from 'react';
import { Row , Col } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilter} from '@fortawesome/free-solid-svg-icons'

import { getAllAuctions, getCurrentAuctions } from '../../../Api/AuctionsApi';
import useHttp from '../../../CustomHooks/useHttp';
import ViewAuctionDetails from '../../UI/ViewAuctionDetails/ViewAuctionDetails';

import AuctionHeader from '../../UI/AuctionHeader/AuctionHeader'
import NoData from '../../UI/NoData'

import classes from './ViewAllAuctions.module.css'
import FilterdAuctions from './FilterdAuction';
import Navbar from '../../HomePage/Header/Navbar';


const ViewAllAuctions = () => {

	const [showFilter , setShowFilter] = useState(null)

	const [FilterAuction , setFilterAuction] = useState(false)
	const [FilterdDetails , setFilterdDetails] = useState(null)

	const {sendRequest , status , data , error} = useHttp(getAllAuctions);
	const {sendRequest:sendFilterdRequest , status:FilterdRequestStatus , data:FilterdRequestData } = useHttp(getCurrentAuctions);


	useEffect(()=>{
		if(!FilterAuction){
			sendRequest()
			console.log("noo")
		}
		else{
			sendFilterdRequest()
			console.log("yes")
		}
	} , [sendRequest , FilterAuction])

	const showFilterHandler = () => {
		setShowFilter(true)
	}

	const hideFilterHandler = () => {
		setShowFilter(false)
	}

	const filterHandeler = (values) => {
		if(values){
			console.log(values)
			setFilterAuction(true)
			setFilterdDetails(values)
		}
		else{
			setFilterAuction(false)
		}
	}

	console.log(showFilter)
	return (
		<div className={classes.ViewAllAuctions}>
			<Navbar/>
			<Row className="m-0 p-0">
				<Col md={4} lg={2} className="m-0 p-0" >
					<FilterdAuctions hideFilter={hideFilterHandler} showFilter = {showFilter} filterHandeler = {filterHandeler} />
				</Col>

				<Col md={8} lg={10}>

					{ data && data.length > 0 &&
						<div className = {classes.AllAuction}>

							<AuctionHeader text="View All Auctions" showLink = {false}/>

							{/* Auction Filter in Small Media Query */}
							<div className={`${classes.FilterIcons} ${showFilter ? 'mt-0' : ''} text-end `}>
								{!showFilter &&
									<button className='btn bg-none text-light d-md-none d-sm-inline-block' onClick={showFilterHandler}>
										<FontAwesomeIcon icon={faFilter}  className=" px-2" />
										Filter Auction
									</button>
								}
							</div>

							{FilterdRequestData && FilterdRequestStatus==='completed'  &&<ViewAuctionDetails AuctionData = {FilterdRequestData} animate={false} />}
							{data && !FilterAuction && status==='completed' && <ViewAuctionDetails AuctionData = {data} animate={false} />}
							<NoData text="No Auctions Now" data={data && data} error= {error && error} />

						</div>
					}
				</Col>



			</Row>
		</div>
	);
}

export default ViewAllAuctions;