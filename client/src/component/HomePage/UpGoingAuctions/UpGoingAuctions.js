import React ,{ Fragment} from "react";
import UpGoingCarousel from "./UpGoingCarousel";

import classes from './UpGoingAuctions.module.css'

const  UpGoingAuctions =()=> {
	return (
		<Fragment>
			<div className={` ${classes.UpGoingAuctions} h-100 container`}>
				<UpGoingCarousel/>
			</div>
		</Fragment>
	);
}

export default UpGoingAuctions;