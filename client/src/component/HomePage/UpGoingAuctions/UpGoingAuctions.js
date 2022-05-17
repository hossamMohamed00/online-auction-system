import React ,{ Fragment, useEffect} from "react";
import UpGoingCarousel from "./UpGoingCarousel";

import classes from './UpGoingAuctions.module.css'
import { getUpgoingAuctions } from "../../../Api/AuctionsApi";
import useHttp from "../../../CustomHooks/useHttp";
import NoData from "../../UI/NoData";
import AuctionHeader from "../../UI/AuctionHeader/AuctionHeader";

const  UpGoingAuctions =()=> {

	const {sendRequest , status , data , error} = useHttp(getUpgoingAuctions);

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
			<div className={` ${classes.UpGoingAuctions} container-fluied`}>
				<AuctionHeader text="UpGoing Auctions" showLink={true} />
				<div className={classes.UpGoingAuctionsContent}>
					{status === 'completed' && data.length > 0 && <UpGoingCarousel UogoingAuctionData={data}/> }
				</div>

				<NoData text="No UPgoing Auctions Now" data={data && data} error= {error && error} />

			</div>
		</Fragment>
	);
}

export default UpGoingAuctions;