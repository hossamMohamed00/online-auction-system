import React ,{ Fragment, useEffect} from "react";

import { getAllAuctions } from "../../../Api/AuctionsApi";
import AuctionDetails from "../../UI/AuctionDetails/AuctionDetails";
import useHttp from '../../../CustomHooks/useHttp'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'

import itemImage1 from '../../../assets/pexels-designecologist-1779487.jpg'
import itemImage2 from '../../../assets/pexels-pixabay-38568.jpg'
import itemImage3 from '../../../assets/pexels-antony-trivet-9897933.jpg'

import classes from './CurrentAuctions.module.css'

import { Link } from "react-router-dom";


const CurrentAuctionsItems = [
	{ 'id'							: Math.random(),
		'ItemImageSrc' 		: itemImage1 ,
		'ItemName'				: 'Labtop',
		'ItemCategory' 		: 'Labtop ',
		'ItemDescription' : 'IPhone description '
	},
	{ 'id'							: Math.random() ,
		'ItemImageSrc' 		: itemImage2 ,
		'ItemName'				: 'IPhone',
		'ItemCategory' 		: 'Screens ',

		'ItemDescription' : 'IPhone description '
	},
	{ 'id'							: Math.random() ,
		'ItemImageSrc' 		: itemImage3 ,
		'ItemName'				: 'Watch',
		'ItemCategory' 		: 'Watches ',

		'ItemDescription' : 'Watch description '
	},
	{ 'id'							: Math.random() ,
		'ItemImageSrc' 		: itemImage3 ,
		'ItemName'				: 'Watch',
		'ItemCategory' 		: 'Watches ',

		'ItemDescription' : 'Watch description '
	}
]
const FirstThreeItems =  CurrentAuctionsItems.slice(0,3)


const AuctionDate = new Date('Fri Apr 29 2022 16:13:00');

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
				<AuctionDetails AuctionData={FirstThreeItems}  AuctionDate={AuctionDate}/>
				{CurrentAuctionsItems.length>3 &&
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