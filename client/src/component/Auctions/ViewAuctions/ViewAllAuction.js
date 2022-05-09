import React, { useEffect, useState } from 'react';
import { Row , Col } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFilterCircleXmark , faFilter} from '@fortawesome/free-solid-svg-icons'

import { getCurrentAuctions } from '../../../Api/AuctionsApi';
import useHttp from '../../../CustomHooks/useHttp';
import ViewAuctionDetails from '../../UI/ViewAuctionDetails/ViewAuctionDetails';

import classes from './ViewAllAuctions.module.css'


const ViewAllAuctions = () => {
	const {sendRequest , status , data } = useHttp(getCurrentAuctions);
	const [showFilter , setShowFilter] = useState(null)

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	const showFilterHandler = () => {
		setShowFilter(true)
	}

	const hideFilterHandler = () => {
		setShowFilter(false)

	}

	console.log(showFilter)
	return (
		<div className={classes.ViewAllAuctions}>
			<Row className="m-0 p-0">
				<Col md={3} lg={2} className="m-0 p-0" >
					<div className={` ${classes.FilterAuctions} ${showFilter ? 'd-inline-block' : 'd-none'} d-md-inline-block`}>
						{showFilter && <FontAwesomeIcon icon={faFilterCircleXmark} className="d-md-none" onClick={hideFilterHandler}/> }
						<p> Filter</p>
					</div>
				</Col>

				<Col md={9} lg={10}>

					{ data && data.length > 0 &&
						<div className = {classes.AllAuction}>
							<div className='text-center'>
								<hr className={classes.hrRight}></hr>
								<h3 className='d-inline-block text-center text-light p-2'> View All Auctions</h3>
								<hr className={classes.hrLeft}></hr>
							</div>

							{/* Auction Filter in Small Media Query */}
							<div className={`${classes.FilterIcons} ${showFilter ? 'mt-0' : ''} text-end `}>
								{!showFilter &&
									<button className='btn bg-none text-light d-md-none d-sm-inline-block' onClick={showFilterHandler}>
										<FontAwesomeIcon icon={faFilter}  className=" px-2" />
										Filter Auction
									</button>
								}
							</div>

							<ViewAuctionDetails AuctionData = {data} animate={false} />
						</div>
					}
				</Col>



			</Row>
		</div>
	);
}

export default ViewAllAuctions;