import React, { Fragment, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'

import {Link, useLocation} from 'react-router-dom';

import Navbar from '../../HomePage/Header/Navbar';

import ViewAuctionDetails from '../../UI/ViewAuctionDetails/ViewAuctionDetails';
import useHttp from '../../../CustomHooks/useHttp';
import { getCategoryAuctions } from '../../../Api/CategoryApi';

import classes from "./ViewCategoryAuctions.module.css"

const  ViewCategoryAuctions = () => {

	const [showRestItems , setShowRestItems] = useState(false)

	const {sendRequest , status , data } = useHttp(getCategoryAuctions);

	const FirstThreeItems =  data && data.slice(0,3)
	const RestItems 			=  data && data.slice(3)

	const location = useLocation()
	const CategoriyId = new URLSearchParams(location.search).get('id')


	useEffect(()=>{
		if(CategoriyId){
			sendRequest(CategoriyId)
		}
	} , [sendRequest , CategoriyId])


	useEffect(()=>{
		if(status === 'compelte'){
			console.log(data)
		}
	} , [status])

	return (
		<Fragment>
			<div className= {classes.ViewCategoryAuctions}>
				<Navbar/>
				{data && data.length > 0 && <ViewAuctionDetails AuctionData={FirstThreeItems} />}
				{showRestItems && data && data.length > 0 && <ViewAuctionDetails AuctionData={RestItems} animate={true} /> }

				{ status === 'completed' && (!data || data.length === 0 ) &&
					<div class="alert alert-danger text-center p-4" role="alert">
						<h3 className='mb-3'> No Auctions in this Category </h3>
						<Link className={`text-decoration-none  px-4 ${classes.btnBackHome}`} to='/home-page'> Back To HomePage </Link>
					</div>
				}
				{!showRestItems && data && data.length > 3 &&
					<div className='w-100'>
						<button className= {` text-light  ${classes.btnGetAuctions}`} onClick={() => setShowRestItems(true) }>
							See All Auctions <span></span>
							<FontAwesomeIcon icon={faCircleArrowRight} />
						</button>
					</div>
				}

			</div>
		</Fragment>
	);
}

export default ViewCategoryAuctions;