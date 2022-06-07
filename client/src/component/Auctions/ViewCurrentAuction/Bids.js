import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Bids.module.css';
import scrollbarStyle from '../../UI/ScrollBar.module.css';
import moment from 'moment';

const Bids = ({ socket, roomData }) => {
	const [messageToClient, setMessageToClient] = useState('');

	useEffect(() => {
		if (socket) {
			socket.on('message-to-client', data => {
				setMessageToClient(data.message);
			});
		}
	}, [socket]);

	const showRoomData = roomData.bids ? (
		roomData.bids.map((bidDetails, index) => (
			<div
				className={`${classes.BidsContent} toast d-block mb-3 w-100`}
				role="alert"
				key={index}
			>
				<div className={`toast-header text-dark ${classes.BidsHeader}`}>
					<FontAwesomeIcon
						icon={faUser}
						className="px-1 rounded-circle bg-dark text-light p-1 mx-2 "
					/>

					<strong className="me-auto text-light ">
						{' '}
						{(bidDetails['user'] && bidDetails['user']['name']) ||
							bidDetails.userEmail}{' '}
					</strong>
					<small className="text-danger fw-bold">
						{' '}
						{moment(bidDetails.createdAt).format('LTS')}
					</small>
				</div>
				<div className="toast-body text-light">{bidDetails.amount} </div>
			</div>
		))
	) : (
		<p className="text-danger"> No Bidding Now </p>
	);

	return (
		<div className={`${scrollbarStyle.scrollbar} ${classes.Bids} `}>
			{messageToClient && (
				<div className={classes.messageToClient}> {messageToClient} </div>
			)}
			{showRoomData}
		</div>
	);
};

export default Bids;
