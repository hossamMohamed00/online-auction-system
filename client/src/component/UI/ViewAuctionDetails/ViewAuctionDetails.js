import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { Link, useLocation } from 'react-router-dom';

import classes from './ViewAuctionDetails.module.css';
import CountDownTimer from '../CountDownTimer/CountDownTimer';

const ViewAuctionDetails = props => {
	console.log(props.AuctionData)
	const location = useLocation();
	const viewAllAuctionPage = location.pathname === '/auctions';
	const homePage = location.pathname === '/home-page';
	const getAuctionDetails = (Items, animate) => {
		return (
			props.AuctionData &&
			Items &&
			Items.map((item, idx) => (
				<Col key={idx} lg={props.lg && props.lg}>
					<Card
						className={` mb-5 ${classes.CurrentAuctionsCard} ${
							animate ? 'animation' : ''
						} `}
					>
						{/* Card item category */}
						<Card.Img
							className="position-relative"
							variant="top"
							src={item.item.images && item.item.images[0].url}
						/>
						<div
							className={`${classes.CardItemCategory} ${item.status === 'closed' ? 'bg-alert': '' } ${
								viewAllAuctionPage ? classes.CardAuctionStatus : ''
								}

							 `}
						>
							{viewAllAuctionPage ? item.status : item.status}
						</div>
						<div className={classes.Timer}>
							{item.status !=='closed' ?
								CountDownTimer(new Date(item.endDate))
								: <>
										<span> 0 </span>
										<span> 0 </span>
										<span> 0 </span>
										<span> 0 </span>

									</>
							}
						</div>

						<Card.Body>
							<Card.Title className="fw-bold fs-5">
								{' '}
								{item['title']}{' '}
							</Card.Title>
							<Card.Text className="mt-2">
								<div className='mt-3'>
									Description :
									<span className="fs-6 fw-light text-light ps-2">
										{item['item']['shortDescription']}
									</span>
								</div>
								<div className='mt-3'>
									Creator :
									<Link
										className={`fs-6 fw-light text-decoration-none text-light ps-2`}
										to={`/seller?id=${item.seller._id}`}
									>
										{item.seller.name}
									</Link>
								</div>
								{(viewAllAuctionPage || homePage )&& (
									<div className='mt-3'>
										Category :
										<Link
											to={`/categories?id=${item.category &&
												item.category._id}`}
											className="text-decoration-none"
										>
											<span className="fs-6 fw-light text-light ps-2">
												{item.category && item.category.name}
											</span>
										</Link>
									</div>
								)}
								{(item.status === 'closed' || item.status ==='ongoing')&& (
									<>
										<hr></hr>
										<div className='mt-3 text-light fw-bold'>
											Num Of Bids  :
											<span className="fs-6 fw-light text-light ps-2"> {item['numOfBids'] ? item['numOfBids'] : 0}</span>
										</div>

										<div className='mt-3 text-light fw-bold'>
											Last Bid :
											<span className="fs-6 fw-light text-light ps-2"> {item['currentBid'] ? item['currentBid'] : 0} </span>
										</div>

										<div className='mt-3 text-alert fw-bold'>
											Winner Name :
											<span className="fs-6 fw-bold text-alert ps-2"> {item['winningBuyer'] ? item['winningBuyer'].name : ' No Winner'} </span>
										</div>

								</>
								)}
								{item.status === 'upcoming' && (
									<>
									<div className='mt-3 text-light fw-bold'>
											Chair Cost :
											<span className="fs-6 fw-light text-light ps-2"> {item['chairCost'] ? item['chairCost'] : 0} </span>
										</div>
										<div className='mt-3 text-light fw-bold'>
											Base Price :
											<span className="fs-6 fw-light text-light ps-2"> {item['basePrice'] ? item['basePrice'] : 0} </span>
										</div>


									</>
								)}


							</Card.Text>

							<Link
								className={`${classes.CardFooter} btn col-6 bg-main `}
								to={`/auctions?id=${item._id}`}
							>
								{' '}
								View Details
							</Link>
						</Card.Body>
					</Card>
				</Col>
			))
		);
	};

	return (
		<div className={classes.CurrentAuctionsContent}>
			<Row xs={1} sm={2} lg={3} className="g-4 mx-auto">
				{props.AuctionData && getAuctionDetails(props.AuctionData, props.animate)}
			</Row>
		</div>
	);
};

export default ViewAuctionDetails;
