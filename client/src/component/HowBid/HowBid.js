import React from "react";
import Navbar from "../HomePage/Header/Navbar";

// import style of HowBid
import classes from './HowBid.module.css'

const HowBid = () => {
	return(
		<React.Fragment>
			<Navbar/>
			<div className={` ${classes.HowBid} container `} >
				{/* start How Bid Content */}
				<h3 className="text-center "> How Bid  </h3>


			</div>
			{/* end How Bid Content */}
		</React.Fragment>
	)
}

export default HowBid ;