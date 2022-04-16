import React ,{ Fragment} from "react";
import UpGoingCarousel from "./UpGoingCarousel";

import classes from './UpGoingAuctions.module.css'

const  UpGoingAuctions =()=> {
	return (
		<Fragment>
			<div className={` ${classes.UpGoingAuctions} h-100 container`}>
				{/* <h3 className="px-5 mx-5 d-inline-block" > UpGoing Auctions</h3 > */}
				<UpGoingCarousel/>
			</div>
		</Fragment>
	);
}

export default UpGoingAuctions;