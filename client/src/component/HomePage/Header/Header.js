import React ,{ Fragment} from "react";

import Search from "./Seach";
import Navbar from "./Navbar";

import classes from './Header.module.css'
import Services from "./Services";

const  Header = () => {
	return (
		<Fragment>

			<div className="position-relative">

				<Navbar/>
				{/* start Header  */}
				<div className= {classes.Header}>
				</div>

				{/* start Header content  */}
				<div className={classes.overlay}>
					<div className={classes.HeaderContent}>
						<div className="">
							<h2 className="fw-bold text-light pt-3 pb-2 fa-1 text-center">
								Best Place TO Bid Or Sell
							</h2>
							<h4 className={`fw-bold text-light pt-3 pb-2 fa-1 text-center ${classes.moreInfo}`}>
							Every Auction comes packed with all the features you need to run a live event too
							</h4>
						</div>

					</div>
				</div>
				{/* end Header content  */}


				{/* end Header  */}
			</div>

			{/* start services */}
			<Services/>
			{/* end services */}

		</Fragment>
	);
}

export default Header;