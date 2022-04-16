import React  from "react";
import { Carousel } from "react-bootstrap";

import LabtopImage from '../../../assets/1458.png'
import LabtopImage2 from '../../../assets/pexels-sora-shimazaki-5668473.png'

import classes from './UpGoingCarousel.module.css'

const UpGoingCarousel = () => {
	return(
		<>
			<Carousel slide className={` container ${classes.Carousel} m-auto `}
				prevIcon = {<span className={`carousel-control-prev-icon ${classes['prev']} `}> </span>}
				nextIcon = {<span className={`carousel-control-next-icon ${classes['next']} `}> </span>}
			>
				<Carousel.Item className={` ${classes['carousel-inner']} `} interval={2000}>
					<div className="row">
						<div className={` ${classes.ImageCarousel} col-lg-4 col-md-6 col-sm-12`}>
							<p className={`${classes.alertText} text-center p-1 m-0 fw-bold `}> UpGoing Auctions  </p>
							<img src={LabtopImage} alt="labtopImage" className={classes.itemImage} />
							<p className="text-center pl-5 fw-bold"> Category : Labtop   </p>
						</div>

						<div className="col-lg-6 col-md-6 col-sm-12 pt-2 ">
							<h2 className="fw-bold text-center pb-2"> Labtop Dell </h2>
							<p className={` lead ${classes.ItemText} `}>
								Dell 20W6001LUS ThinkPad P15s
								Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz
								NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD
								Win 10 Pro Black – Certified Refurbished
							</p>

							<div className={classes.AuctionDetails}>
								<div className={classes.AuctionTime}>
									<h5 className="fw-bold">Auction Start in </h5>
									<p className="text-center"> 2 days , 18 Hours</p>
								</div>
								<div className={classes.AuctionPrice}>
									<h5 className="fw-bold"> Start Bid will be </h5>
									<p className="text-center pb-0">  1200 $</p>
								</div>
							</div>
						</div>

					</div>

				</Carousel.Item>

				<Carousel.Item className={` ${classes['carousel-inner']} `} interval={2000}>
					<div className="row">
						<div className={` ${classes.ImageCarousel} col-lg-4 col-md-6 col-sm-12`}>
							<p className={`${classes.alertText} text-center p-1 m-0 fw-bold `}> UpGoing Auctions  </p>
							<img src={LabtopImage} alt="labtopImage" className={classes.itemImage} />
							<p className="text-center pl-5 fw-bold"> Category : Labtop   </p>
						</div>

						<div className="col-lg-6 col-md-6 col-sm-12 pt-2 ">
							<h2 className="fw-bold text-center pb-2"> Labtop Dell </h2>
							<p className={` lead ${classes.ItemText} `}>
								Dell 20W6001LUS ThinkPad P15s
								Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz
								NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD
								Win 10 Pro Black – Certified Refurbished
							</p>

							<div className={classes.AuctionDetails}>
								<div className={classes.AuctionTime}>
									<h5 className="fw-bold">Auction Start in </h5>
									<p className="text-center"> 2 days , 18 Hours</p>
								</div>
								<div className={classes.AuctionPrice}>
									<h5 className="fw-bold"> Start Bid will be </h5>
									<p className="text-center pb-0">  1200 $</p>
								</div>
							</div>
						</div>

					</div>

				</Carousel.Item>



			</Carousel>

	</>
)}

export default UpGoingCarousel ;