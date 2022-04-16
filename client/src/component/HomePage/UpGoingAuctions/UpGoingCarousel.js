import React  from "react";
import { Carousel } from "react-bootstrap";
import classes from './UpGoingCarousel.module.css'

import LabtopImage from '../../../assets/1458.png'

const CarouselItems = [{
	'ItemImageSrc' : LabtopImage,
	'ItemCategory' : "Labtop",
	'ItemName' : "Labtop Dell",
	'ItemDescription' : "Dell 20W6001LUS ThinkPad P15s Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD Win 10 Pro Black – Certified Refurbished",
	'ItemAuctionTime' : "2 days , 18 Hours" ,
	'ItemAuctionPrice' : "1200 $"
},
{
	'ItemImageSrc' : LabtopImage,
	'ItemCategory' : "Labtop",
	'ItemName' : "Labtop Dell",
	'ItemDescription' : "Dell 20W6001LUS ThinkPad P15s Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD Win 10 Pro Black – Certified Refurbished",
	'ItemAuctionTime' : "2 days , 18 Hours" ,
	'ItemAuctionPrice' : "1200 $"
}
]

const UpGoingCarousel = () => {

	const ShowCarouselItems = CarouselItems.map((Item , index)=> {
		return(
			<Carousel.Item  className={` ${classes['carousel-inner']} `} interval={2000} key={index}>
			<div className="row">
				<div className={` ${classes.ImageCarousel} col-lg-4 col-md-6 col-sm-12`}>
					<p className={`${classes.alertText} text-center p-1 m-0 fw-bold `}> UpGoing Auctions  </p>
					<img
						src={Item['ItemImageSrc']}
						alt={`${Item['ItemCategory']} + ${index}`}
						className={classes.itemImage}
					/>
					<p className="text-center pl-5 fw-bold"> Category : {Item['ItemCategory']} </p>
				</div>

				<div className="col-lg-6 col-md-6 col-sm-12 pt-2 ">
					<h2 className="fw-bold text-center pb-2"> { Item['ItemName'] } </h2>
					<p className={` lead ${classes.ItemText} `}> { Item['ItemDescription'] } </p>

					<div className={classes.AuctionDetails}>
						<div className={classes.AuctionTime}>
							<h5 className="fw-bold">Auction Start in </h5>
							<p className="text-center"> {Item['ItemAuctionTime']}</p>
						</div>
						<div className={classes.AuctionPrice}>
							<h5 className="fw-bold"> Start Bid will be </h5>
							<p className="text-center pb-0">  {Item['ItemAuctionPrice']} </p>
						</div>
					</div>
				</div>

			</div>

		</Carousel.Item>
	)});

	return(
		<>
			<Carousel slide className={` container ${classes.Carousel} m-auto `}
				prevIcon = {<span className={`carousel-control-prev-icon ${classes['prev']} `}> </span>}
				nextIcon = {<span className={`carousel-control-next-icon ${classes['next']} `}> </span>}
			>
					{ShowCarouselItems}
			</Carousel>

	</>
)}

export default UpGoingCarousel ;