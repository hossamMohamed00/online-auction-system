import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

import 	classes from './Bidders.module.css'

function Bidders() {
	return (
		<>
			<div className={`toast d-block mb-4 w-100`} role="alert" >
				<div className={`toast-header text-dark ${classes.BiddersHeader}`}>
					<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
					<strong className="me-auto "> Bidder 1 </strong>
				</div>

			</div>
			<div className={`${classes.BidsContent} toast d-block mb-5 w-100`} role="alert" >
				<div className={`toast-header text-dark ${classes.BiddersHeader}`}>
					<FontAwesomeIcon icon= {faUser} className="px-1 rounded-circle bg-dark text-light p-1 mx-2 " />
					<strong className="me-auto "> Bidder 1 </strong>
				</div>
				</div>


		</>
	);
}

export default Bidders;