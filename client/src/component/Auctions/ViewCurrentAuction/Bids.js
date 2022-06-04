import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Bids.module.css';
import scrollbarStyle from '../../UI/ScrollBar.module.css';
import { toast } from 'react-toastify';
import moment from 'moment';


const Bids = React.memo(({socket , BidderIsBid , roomData}) => {

	const [messageToClient , setMessageToClient] = useState('')
	const [newBid , setNewBidData] = useState({})


	const [AllBidsInRoom , setAllBidsInRoom ] = useState([])
	useEffect(()=>{
		if(roomData.length !==0 && !newBid && socket){
			console.log(...roomData)
			setAllBidsInRoom([{...roomData , newBid:[]}])
		}

	},[roomData , newBid , socket])


	useEffect(()=>{
		if(socket && BidderIsBid){
			socket.on('new-bid', data_ => {
				console.log('new-bid' , data_)
				toast.success("new Bid is Adding Successfully ❤️‍🔥 ")
				// const NewBidding = AllBidsInRoom.bids.push(data)
				setNewBidData(data_)
				// setAllBidsInRoom(NewBidding)
				if (roomData.length !==0  ){
					// const newBid = AllBidsInRoom && AllBidsInRoom.newBid.push(data_)
					console.log(AllBidsInRoom.newBid)
					// const newData = [...AllBidsInRoom ]
					// console.log(newData)
					// setAllBidsInRoom(newData)
				}
			});

			socket.on('exception', data => {
				console.log('exception' , data)
			});
		}
	},[BidderIsBid])

	useEffect(()=>{
		if(socket){
		socket.on('message-to-client', data => {
			console.log('message-to-client' , data)
			setMessageToClient(data.message)
		});
	}
	},[socket])

	console.log(roomData , AllBidsInRoom)
	const showRoomData =
	newBid && newBid.map(bidDetails => {
			return (
				<>
				<div
					className={`${classes.BidsContent} toast d-block mb-3 w-100`}
					role="alert"
					key = {bidDetails.data._id}
				>
					<div className={`toast-header text-dark ${classes.BidsHeader}`}>
						<FontAwesomeIcon
							icon={faUser}
							className="px-1 rounded-circle bg-dark text-light p-1 mx-2 "
						/>

						<strong className="me-auto text-light "> {bidDetails.data['user']['name'] } </strong>
						<small className="text-danger fw-bold">  {moment(bidDetails.data.createdAt).format('LT')}</small>

					</div>
					<div className="toast-body text-light">{bidDetails.data.amount }  </div>
				</div>
			</>
			)
	})



	return (
		<div className={`${scrollbarStyle.scrollbar} ${classes.Bids} `}>
			{messageToClient && <div className={classes.messageToClient}> {messageToClient} </div> }
			{showRoomData ?showRoomData : <p className='text-danger'>  No Bidding Now</p>}
		</div>
	);
})

export default Bids;
