import React ,{ Fragment} from "react";
import CurrentAuctions from "./CurrentAuctions/CurrentAuctions";
import Header from "./Header/Header";
import UpGoingAuctions from "./UpGoingAuctions/UpGoingAuctions";

import scollbarStyle from '../UI/ScrollBar.module.css'


const HomePage = () => {
	return (
		<Fragment>
			<div className= {`${scollbarStyle.scollbar} container-fluid px-0`} style={{backgroundColor: "#191a19" , minHeight:"100vh"}}>
				<Header/>
				<UpGoingAuctions/>
				<CurrentAuctions/>
			</div>


		</Fragment>
	);
}

export default HomePage;