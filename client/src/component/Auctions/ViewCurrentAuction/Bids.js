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
						className="px-1 rounded-circle bg-dark text-light p-3 mx-2 fs-6 "
					/>

					<strong className="me-auto text-light fs-6 fw-bold ">
						{' '}
						{(bidDetails['user'] && bidDetails['user']['name']) ||
							bidDetails.userEmail}{' '}
					</strong>
					<small className="text-danger fw-bold ">
						{' '}
						{moment(bidDetails.createdAt).format('LTS')}
					</small>
				</div>
				<div className="toast-body text-light fw-bold fs-6 p-2">{bidDetails.amount} </div>
			</div>
		))
	) : (
		<p className="text-danger text-center fw-bold fs-5 p-2"> No Bidding Now </p>
	);

	return (
		<div>
			{messageToClient && (
				<div className={classes.messageToClient}> {messageToClient} </div>
			)}

			<div className={`${scrollbarStyle.scrollbar} ${classes.Bids} `}>

			{showRoomData}
		</div>
		</div>

	);
};

export default Bids;
