import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

import AuctionFooter from './AuctionFooter';

import 	classes from './Bids.module.css'
import scollbarStyle from '../../UI/ScrollBar.module.css'

function Bids() {
	return (

			<div className={`${scollbarStyle.scollbar} ${classes.Bids} `}>

				<div className={`${classes.BidsContent} toast d-block mb-3 w-100`} role="alert" >
					<div className={`toast-header text-dark ${classes.BidsHeader}`}>
						<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
						<strong className="me-auto "> Bidder 1 </strong>
						<small>11 mins ago</small>
					</div>
					<div className="toast-body text-light">
						75,000 $
					</div>

				</div>

				<div className={`${classes.BidsContent} toast d-block mb-3 w-100 `} role="alert" >
					<div className={`toast-header text-dark ${classes.BidsHeader}`}>
						<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
						<strong className="me-auto "> Bidder 2 </strong>
						<small>13 mins ago</small>
					</div>
					<div className="toast-body text-light">
						5,000 $
					</div>

				</div>

				<div className={`${classes.BidsContent} toast d-block mb-3 w-100`} role="alert" >
					<div className={`toast-header text-dark ${classes.BidsHeader}`}>
						<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
						<strong className="me-auto "> Bidder 2 </strong>
						<small>13 mins ago</small>
					</div>
					<div className="toast-body text-light">
						5,000 $
					</div>

				</div>

				<div className={`${classes.BidsContent} toast d-block mb-3  w-100`} role="alert" >
					<div className={`toast-header text-dark ${classes.BidsHeader}`}>
						<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
						<strong className="me-auto "> Bidder 2 </strong>
						<small>13 mins ago</small>
					</div>
					<div className="toast-body text-light">
						5,000 $
					</div>

				</div>
			</div>
	);
}

export default Bids;