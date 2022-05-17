import React ,{ Fragment, useEffect} from "react";

import { getCurrentAuctions } from "../../../Api/AuctionsApi";
import ViewAuctionDetails from "../../UI/ViewAuctionDetails/ViewAuctionDetails";
import useHttp from '../../../CustomHooks/useHttp'

import classes from './CurrentAuctions.module.css'

import NoData from "../../UI/NoData";
import AuctionHeader from "../../UI/AuctionHeader/AuctionHeader";

const CurrentAuctions = () => {

	const {sendRequest , status , data , error } = useHttp(getCurrentAuctions);
	const FirstThreeItems =  data && data.slice(0,3)

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	return (
		<Fragment>
			<div className={`${classes.CurrentAuctions} container-fluied`}>
				<AuctionHeader text="Current Auctions" showLink={true} />
				{data && status==='completed' && data.length > 0  && <ViewAuctionDetails AuctionData={FirstThreeItems} /> }

				<NoData text="No Current Auctions Now" data={data && data} error= {error && error} />
			</div>

		</Fragment>
	);
}

export default CurrentAuctions;