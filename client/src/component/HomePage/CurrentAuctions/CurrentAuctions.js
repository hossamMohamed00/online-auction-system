import React ,{ Fragment, useEffect} from "react";
import CurrentAuctionsContent from "./CurrentAuctionsContent";

import useHttp from '../../../CustomHooks/useHttp'

import classes from './CurrentAuctions.module.css'
import { getAllAuctions } from "../../../Api/AuctionsApi";

const CurrentAuctions = () => {

	const {sendRequest , status , data , error } = useHttp(getAllAuctions);

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	useEffect(()=>{
		if(status === 'compelte'){
			console.log(data)
		}
	} , [status])


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