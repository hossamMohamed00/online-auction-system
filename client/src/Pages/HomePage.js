import React ,{ Fragment} from "react";
import { useSelector } from "react-redux";

import Header from "../component/HomePage/Header/Header";
import UpComingAuctions from "../component/HomePage/UpComingAuctions/UpComingAuctions";
import OnGoingAuctions from "../component/HomePage/OnGoingAuctions/OnGoingAuctions";
import Footer from "../component/HomePage/Footer/Footer";

import scollbarStyle from '../component/UI/ScrollBar.module.css'
import HowBid from "../component/HowBid/HowBid";


const HomePage = () => {
	const token = useSelector(store => store.AuthData.idToken)

	return (
		<Fragment>
			<div className= {`${scollbarStyle.scollbar} container-fluid px-0`} style={{backgroundColor: "#191a19" , minHeight:"100vh"}}>
				<Header/>
				<OnGoingAuctions/>
				<UpComingAuctions/>
				<HowBid/>
				<Footer/>
			</div>

		</Fragment>
	);
}

export default HomePage;