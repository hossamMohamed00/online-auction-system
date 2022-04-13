import React ,{ Fragment} from "react";
import UpGoingCarousel from "./UpGoingAuctionContent/UpGoingCarousel";

import classes from './UpGoingAuctions.module.css'

const  UpGoingAuctions =()=> {
	return (
		<Fragment>
			<div className={` ${classes.UpGoingAuctions} h-100 `}>
				<h2 className='fw-bold'> UpGoing Auctions</h2>
				<UpGoingCarousel/>
			</div>
		</Fragment>
	);
}

export default UpGoingAuctions;