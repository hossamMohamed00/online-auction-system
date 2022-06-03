import React, { useEffect, useState } from 'react';
import classes from './ViewCurrentAuction.module.css';

const BiddingDetails = ({socket , isShowBids}) => {
	const [roomData , setRoomData] = useState([])

	useEffect(()=>{
		socket.on('room-data' , data => {
			console.log('room data' , data)
			setRoomData(data.auctionDetails)
		})
		socket.on('new-bid', data => {
			console.log('new-bid' , data)
			// setNewBidData(data)
		});
	},[socket])
	return (
		<div className={`d-flex justify-content-center ${isShowBids ? 'd-flex': 'd-none'}`}>
			<div className={classes.BiddingDetails}>
				<h6> Minimum Bid Allowed </h6>
					<p> {roomData && roomData['minimumBidAllowed']}  </p>
			</div>

			<div className={classes.BiddingDetails}>
				<h6> Current bid Now </h6>
				<p> {roomData && roomData['currentBid'] ?roomData['currentBid']  : 0}  </p>
			</div>
		</div>
	);
}

export default BiddingDetails;