import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { Link, useLocation } from 'react-router-dom';

import classes from './ViewAuctionDetails.module.css';
import CountDownTimer from '../CountDownTimer/CountDownTimer';

const ViewAuctionDetails = props => {
	const location = useLocation();
	const viewAllAuctionPage = location.pathname === '/auctions';
	const homePage = location.pathname === '/home-page';
	const [Data , setData] = useState([])
	// const AuctionItems = props.AuctionData && props.AuctionData.
	useEffect(()=>{
		if(props.AuctionData){
			console.log('render')
			setData(
				props.AuctionData.filter(data => data.status !== 'pending' && data.status !== 'denied')
			)
		}

	} , [props.AuctionData])

	console.log(Data)
	const getAuctionDetails = (animate) => (
			Data &&
			Data.map((item, idx) => (
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
							className={`${classes.CardItemCategory} ${
								item.status === 'closed' ? 'bg-alert' : ''
							} ${viewAllAuctionPage ? classes.CardAuctionStatus : ''}

							 `}
						>
							{viewAllAuctionPage ? item.status : item.status}
						</div>
						<div className={classes.Timer}>
							{(item.status && item.status !== 'closed') ?
								( item.status==='upcoming' ? <CountDownTimer AuctionDate = {new Date(item.startDate)} /> : <CountDownTimer AuctionDate = {new Date(item.endDate)} /> )
							 : (
								<div className='mt-4'>
								</div>
							)}
						</div>

						<Card.Body>
							<Card.Title className="fw-bold fs-5">
								{' '}
								{item['title']}{' '}
							</Card.Title>
							<Card.Text className="mt-2">
								<div className="mt-3">
									Description :
									<span className="fs-6 fw-light text-light ps-2">
										{item['item']['shortDescription']}
									</span>
								</div>
								<div className="mt-3">
									Creator :
									<Link
										className={`fs-6 fw-light text-decoration-none text-light ps-2`}
										to={`/seller?id=${item.seller._id}`}
									>
										{item.seller.name}
									</Link>
								</div>
								{(viewAllAuctionPage || homePage) && (
									<div className="mt-3">
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
								{(item.status === 'closed' || item.status === 'ongoing') && (
									<div>
										<div className="mt-3 text-light fw-bold">
											Num Of Bids :
											<span className="fs-6 fw-light text-light ps-2">
												{' '}
												{item['numOfBids'] ? item['numOfBids'] : 0}
											</span>
										</div>

										<div className="mt-3 text-light fw-bold">
											Last Bid :
											<span className="fs-6 fw-light text-light ps-2">
												{' '}
												{item['currentBid'] ? item['currentBid'] : 0}{' '}
											</span>
										</div>

										<div className="mt-3 text-alert fw-bold">
											Winner Name :
											<span className="fs-6 fw-bold text-alert ps-2"> {item['winningBuyer'] ? item['winningBuyer'].name : ' No Winner'} </span>
										</div>
									</div>
								)}
								{item.status === 'upcoming' && (
									<div>
										<div className="mt-3 text-light fw-bold">
											Chair Cost :
											<span className="fs-6 fw-light text-light ps-2">
												{' '}
												{item['chairCost'] ? item['chairCost'] : 0}{' '}
											</span>
										</div>
										<div className="mt-3 text-light fw-bold">
											Base Price :
											<span className="fs-6 fw-light text-light ps-2">
												{' '}
												{item['basePrice'] ? item['basePrice'] : 0}{' '}
											</span>
										</div>
									</div>
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


	return (
		<React.Fragment>
			{Data &&
			(	console.log(Data) ,
				<div className={classes.CurrentAuctionsContent}>
					<Row xs={1} sm={2} lg={3} className="g-4 mx-auto">
						{getAuctionDetails(props.animate)}
					</Row>
				</div>
			)}
		</React.Fragment>

	);
};

export default ViewAuctionDetails;
