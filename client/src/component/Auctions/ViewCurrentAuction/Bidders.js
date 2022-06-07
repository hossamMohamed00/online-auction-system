import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import classes from './Bids.module.css';
import scrollbarStyle from '../../UI/ScrollBar.module.css';


const Bidders =({roomData}) => {
	console.log(roomData && roomData)
	const showRoomData =
	roomData.bidders ?
		roomData.bidders.map((biddersDetails , index) => (
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

						<strong className="me-auto text-light "> {(biddersDetails['user'] && biddersDetails['user']['name']) || biddersDetails.email} </strong>

					</div>
				</div>

			)) : <p className='text-danger'>  No Bidders Now </p>



	return (
		<div className={`${scrollbarStyle.scrollbar} ${classes.Bids} `}>
			{showRoomData}
		</div>
	);
}

export default Bidders;
