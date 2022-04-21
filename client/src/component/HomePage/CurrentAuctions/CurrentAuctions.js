import React ,{ Fragment} from "react";
import CurrentAuctionsContent from "./CurrentAuctionsContent";

import classes from './CurrentAuctions.module.css'

const CurrentAuctions = () => {
	return (
		<Fragment>
			<div className={`${classes.CurrentAuctions} container`}>
				<h2 className="text-light fw-bold px-3 pt-3"> Current Auctions  </h2>
				<CurrentAuctionsContent />
			</div>

		</Fragment>
	);
}

export default CurrentAuctions;