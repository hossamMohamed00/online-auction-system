import React  from "react";
import classes from './UpGoingAuctions.module.css'

import LabtopImage1 from '../../../assets/pexels-pixabay-38568.jpg'
import Slider from "../../UI/Carousel/Carousel";
import CountDownTimer from '../../UI/CountDownTimer/CountDownTimer'

const UpGoingCarousel = ({UogoingAuctionData}) => {

	const ShowCarouselItems = UogoingAuctionData.map((Item , index)=> {
		return(
			<div className="row" key={index}>
				<div className={` ${classes.ImageCarousel}  col-md-6 col-sm-12`}>
					<p className={`${classes.alertText} text-center p-1 m-0 fw-bold `}> UpGoing Auctions  </p>
					<img
						src={LabtopImage1}
						alt={`itemImage ${index}`}
						className={classes.itemImage}
					/>
					<p className="text-center pl-5 fw-bold"> Category : {Item.category.name} </p>
				</div>

				<div className="col-md-6 col-lg-5 col-sm-12 pt-3 ">
					<h2 className="fw-bold text-center pb-2"> { Item.item.name } </h2>
					<p className={` lead ${classes.ItemText} `}> {  Item.item.shortDescription 	 } </p>

					<div className={classes.AuctionDetails}>
						<div className={classes.AuctionTime}>
							<h5 className="fw-bold">Auction Start in </h5>
							<p className="text-center"> {CountDownTimer(new Date(Item.startDate))} </p>
						</div>
						<div className={classes.AuctionPrice}>
							<h5 className="fw-bold"> Start Bid will be </h5>
							<p className="text-center pb-0">  {Item.minimumBidAllowed} </p>
						</div>
					</div>
				</div>

			</div>
	)});

	return(
		<>
			<Slider>
				{ShowCarouselItems}
			</Slider>
		</>
)}

export default UpGoingCarousel ;