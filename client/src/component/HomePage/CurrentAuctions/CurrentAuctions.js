import React ,{ Fragment, useEffect} from "react";

import { getCurrentAuctions } from "../../../Api/AuctionsApi";
import ViewAuctionDetails from "../../UI/ViewAuctionDetails/ViewAuctionDetails";
import useHttp from '../../../CustomHooks/useHttp'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'


import classes from './CurrentAuctions.module.css'

import { Link } from "react-router-dom";

const CurrentAuctions = () => {

	const {sendRequest , status , data } = useHttp(getCurrentAuctions);
	const FirstThreeItems =  data && data.slice(0,3)

	useEffect(()=>{
		sendRequest()
	} , [sendRequest])

	return (
		<Fragment>
			<div className={`${classes.CurrentAuctions} container`}>
				<h2 className="text-light fw-bold px-3 pt-4 text-center"> Current Auctions  </h2>
				{data && status==='completed'  && <ViewAuctionDetails AuctionData={FirstThreeItems} /> }
				{data && data.length > 3 &&
					<div className='w-100'>
						<Link className= {` text-light text-decoration-none ${classes.btnGetAuctions}`} to="/">
							See All Auctions <span></span>
							<FontAwesomeIcon icon={faCircleArrowRight} />
						</Link>
					</div>
				}
			</div>

		</Fragment>
	);
}

export default CurrentAuctions;