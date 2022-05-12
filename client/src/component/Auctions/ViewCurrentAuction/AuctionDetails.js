import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import useTimer from '../../../CustomHooks/useTimer';

import classes from './AuctionDetails.module.css'

const AuctionDetails = ({data}) => {

	const AuctionDate = data && data.endDate ;
	const {days, hours , minutes , seconds } = useTimer(new Date (AuctionDate))


	return (
		<Fragment>
		{data &&
		<div className={classes.AuctionDetails}>
			<div className={classes.AuctionDetailsContent}>
				<div className={classes.ItemsDetails}>
					<p className='lead p-2'> Dell 20W6001LUS ThinkPad P15s Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD Win 10 Pro Black – Certified Refurbished</p>
				</div>
				<hr className='text-light  my-2 '></hr>

				<div className='w-75 mx-3 '>
					<div className='pb-2'>
						<h6 className='fw-bold text-light d-inline-block'> Creator : </h6>
						<Link className={`d-inline-block px-2 text-decoration-none fw-bold ${classes.CreatorName}`} to = {`/seller?id=${data.seller._id}`} >  {data.seller.name} </Link>

					</div>

					<div className='pb-2 fw-bold '>
						<h6 className='text-light d-inline-block'> Category : </h6>
						<Link className={`d-inline-block px-2 text-decoration-none fw-bold ${classes.CategoryName}`} to = {`/categories?id=${data.category._id}`} >  {data.category.name}  </Link>

					</div>
					<div className='pb-2 fw-bold'>
						<div>
							<h6 className=' text-light d-inline-block'> Brand : </h6>
							<span className={` ps-1 ${classes.CreatorName}`}> {data.item.brand} </span>
						</div>

					</div>

				</div>

				<hr className='text-light mb-4 mt-2 '></hr>

				<div className='d-flex justify-content-evenly w-100 text-center'>
					<div>
						<h6 className='fw-bold text-light px-3'> Minimum Bid </h6>
							<span className={`ps-2 fs-6 ${classes.MinimumBidValue}`}>{data.minimumBidAllowed} </span>
					</div>
					<div className={classes.hrRight}></div>
					<div>
						<h6 className='fw-bold  text-light'> Auction Will End In </h6>
						<span className={`ps-1 fs-6 ${classes.AuctionDate}`}> {`${days } :	${hours }   :   ${minutes}  :  ${seconds} `} </span>
					</div>

				</div>


			</div>

		</div>
		}
		</Fragment>
	);
}

export default AuctionDetails;