import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Bids.module.css';
import scrollbarStyle from '../../UI/ScrollBar.module.css';


const Bids = ({isShownBidsProp , socket}) => {

	const [messageToClient , setMessageToClient] = useState('')
	const [roomData , setRoomData] = useState([])

	useEffect(()=>{
		socket.on('message-to-client', data => {
			console.log('message-to-client' , data)
			setMessageToClient(data.message)
		});

		socket.on('exception', data => {
			console.log('exception' , data)
		});

	},[socket])

	return (
		<div className={`${scrollbarStyle.scrollbar} ${classes.Bids} `}>

			{messageToClient && <div className={classes.messageToClient}> {messageToClient} </div>}

			<div
				className={`${classes.BidsContent} toast d-block mb-3 w-100`}
				role="alert"
			>
				<div className={`toast-header text-dark ${classes.BidsHeader}`}>
					<FontAwesomeIcon
						icon={faUser}
						className="px-1 rounded-circle bg-dark text-light p-1 mx-2 "
					/>
					<strong className="me-auto text-light "> Bidder 1 </strong>
					<small className="text-danger fw-bold">11 mins ago</small>
				</div>
				<div className="toast-body text-light">75,000 $</div>
			</div>


		</div>
	);
}

export default Bids;
