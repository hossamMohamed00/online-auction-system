import React ,{ Fragment} from "react";
import CurrentAuctions from "../component/HomePage/CurrentAuctions/CurrentAuctions";
import Header from "../component/HomePage/Header/Header";
import UpGoingAuctions from "../component/HomePage/UpGoingAuctions/UpGoingAuctions";

import scollbarStyle from '../component/UI/ScrollBar.module.css'
import Footer from "../component/HomePage/Footer/Footer";
import { useSelector } from "react-redux";


const HomePage = () => {
	const token = useSelector(store => store.AuthData.idToken)
	console.log(token , "hhhhhh")
	return (
		<Fragment>
			<div className= {`${scollbarStyle.scollbar} container-fluid px-0`} style={{backgroundColor: "#191a19" , minHeight:"100vh"}}>
				<Header/>
				<CurrentAuctions/>
				<UpGoingAuctions/>
				<Footer/>
			</div>

		</Fragment>
	);
}

export default HomePage;