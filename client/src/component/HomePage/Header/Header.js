import React ,{ Fragment} from "react";

import Search from "./Seach";
import Navbar from "./Navbar";

import classes from './Header.module.css'

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
							<h2 className="fw-bold text-light pt-3 pb-2 fa-1 text-center">Best Place TO Bid Or Sell </h2>
							<Search/>
						</div>

					</div>
				</div>
				{/* end Header content  */}


				{/* end Header  */}





			</div>
		</Fragment>
	);
}

export default Header;