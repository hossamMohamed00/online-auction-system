import React  from "react";
import { Carousel } from "react-bootstrap";
import LabtopImage from '../../../../assets/1458.png'

import classes from './UpGoingCarousel.module.css'

const UpGoingCarousel = () => {
	return(
		<>
			<Carousel className={` container ${classes.Carousel} m-4`}>
				<Carousel.Item className={` ${classes['carousel-inner']} `} interval={1000}>
					<div className="row h-100">
						<div className="col-lg-4 col-md-6 col-sm-12">
							<img src={LabtopImage} alt="labtopImage" className={classes.itemImage} />
							<p className="text-center my-2 fw-bold"> Category : Labtop   </p>
						</div>

						<div className="col-lg-6 col-md-6 col-sm-12 ">
							<h3 className="fw-bold text-center"> Labtop Dell </h3>
							<p className="fs-6" style={{color:"#E9D8A6"}}>
								Dell 20W6001LUS ThinkPad P15s
								Gen 2 15.6″ FHD Touchscreen i7-1165G7 2.8GHz
								NVIDIA Quadro T500 4GB 16GB RAM 512GB SSD
								Win 10 Pro Black – Certified Refurbished
							</p>
						</div>

					</div>

				</Carousel.Item>

			</Carousel>
	</>
)}

export default UpGoingCarousel ;