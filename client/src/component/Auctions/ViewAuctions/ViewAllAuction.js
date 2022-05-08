import React, { useEffect } from 'react';
import { Row , Col } from 'react-bootstrap';

import { getCurrentAuctions } from '../../../Api/AuctionsApi';
import useHttp from '../../../CustomHooks/useHttp';
import ViewAuctionDetails from '../../UI/ViewAuctionDetails/ViewAuctionDetails';

import classes from './ViewAllAuctions.module.css'

const ViewAllAuctions = () => {
	const {sendRequest , status , data } = useHttp(getCurrentAuctions);

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	useEffect(()=>{
		if(status === 'compelte'){
			console.log(data)
		}
	} , [status])


	return (
		<div className={classes.ViewAllAuctions}>
			<h1> View All Auctions</h1>
			<Row className="m-0 p-0">
				<Col lg={2} className="m-0 p-0" >
					<div className={classes.FilterAuctions}>
							dashboard
					</div>
				</Col>

				<Col lg={9} >
					{ data && data.length > 0 && <ViewAuctionDetails AuctionData = {data} animate={false} /> }
				</Col>

			</Row>
		</div>
	);
}

export default ViewAllAuctions;