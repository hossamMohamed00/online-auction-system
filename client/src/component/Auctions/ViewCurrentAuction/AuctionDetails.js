import React, { useState } from 'react';

import useTimer from '../../../CustomHooks/useTimer';
import AuctionFooter from './AuctionFooter';

import classes from './AuctionDetails.module.css'

const AuctionDetails = () => {

	const AuctionDate = new Date('Tue May 03 2022 24:00:00');
	const {hours , minutes , seconds } = useTimer(AuctionDate)


	return (
		<div className={classes.AuctionDetails}>

			<div className={classes.ItemsDetails}>
				<p className='lead p-2'> Dell 20W6001LUS ThinkPad P15s Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD Win 10 Pro Black – Certified Refurbished</p>
			</div>

			<div className='w-75 mx-3 '>
				<div className='pb-2'>
					<h5 className='fw-bold text-light d-inline-block'> Creator : </h5>
					<span className={`ps-1 ${classes.CreatorName}`}> Bidder </span>
				</div>

				<div>
					<h5 className='fw-bold text-light d-inline-block'> Category : </h5>
						<span className={` ps-1 ${classes.CreatorName}`}> Labtop </span>
				</div>

			</div>

			<hr className='text-light  my-4 '></hr>

			<div className='d-flex justify-content-between w-100 text-center'>
				<div>
					<h6 className='fw-bold text-light px-3'> Minimum Bid </h6>
						<span className={`ps-2 fs-6 ${classes.MinimumBidValue}`}> 1500 $ </span>
				</div>
				<div className={classes.hrRight}></div>
				<div>
					<h6 className='fw-bold  text-light'> Auction Will End In </h6>
					<span className={`ps-1 fs-6 ${classes.AuctionDate}`}> {`	${hours }   :   ${minutes}  :  ${seconds} `} </span>
				</div>

			</div>

			<AuctionFooter/>
		</div>
	);
}

export default AuctionDetails;