import React ,{ Fragment, useEffect} from "react";
import UpGoingCarousel from "./UpGoingCarousel";

import classes from './UpGoingAuctions.module.css'
import { getUpgoingAuctions } from "../../../Api/AuctionsApi";
import useHttp from "../../../CustomHooks/useHttp";

const  UpGoingAuctions =()=> {

	const {sendRequest , status , data } = useHttp(getUpgoingAuctions);

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	useEffect(()=>{
		if(status === 'completed'){
			console.log("UpGoingAuctions" , data)
		}
	} , [sendRequest])





	return (
		<Fragment>
			<div className={` ${classes.UpGoingAuctions} h-100 container`}>
				{status === 'completed' && data.length > 0 && <UpGoingCarousel UogoingAuctionData={data}/> }

			</div>
		</Fragment>
	);
}

export default UpGoingAuctions;