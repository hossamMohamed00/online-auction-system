import React, { useState } from 'react';
import BiddingModal from './BiddingForm/BiddingModal';


import classes from './AuctionDetails.module.css'


function AuctionFooter() {
	const [modalShow, setModalShow] = useState(false);

	return (
		<>
		<button className={`btn w-100 fw-bold ${classes.btnPlaceBid}`} type="button" onClick={()=> setModalShow(true)}> Place on Bid</button>

		<BiddingModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
		</>

	);
}

export default AuctionFooter;