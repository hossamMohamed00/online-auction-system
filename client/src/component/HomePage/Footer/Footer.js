import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
	faEnvelope,
	faLocationDot,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Footer.module.css';

function Footer() {
	// start contact us
	const contactUsData = [
		{ text: '(+20) 12547554', icon: faPhone },
		{ text: 'OnlineAuction@email.com', icon: faEnvelope },
		{ text: 'Company Address', icon: faLocationDot },
	];
	const ContactUs = contactUsData.map((data, index) => (
		<Col md={4} sm={6} xs={12} key={index} className="mb-3">
			<FontAwesomeIcon icon={data.icon} className={classes.ContactIcon} />
			<p> {data.text} </p>
		</Col>
	));
	// end contact us

	// start footerMoreDetails
	const FooterMoreDetailsData = [
		{
			text: 'Pages',
			links: [
				{ name: 'Home Page', path: '/' },
				{ name: 'Auctions', path: '/auctions' },
				{ name: 'How Bid', path: '/how-bid' },
				{ name: 'Categories', path: '/' },
			],
		},
		{
			text: 'Buy',
			links: [
				{ name: 'Registration', path: '/register' },
				{ name: 'Charge Wallet', path: '/auctions' },
				{ name: 'Bidding', path: '/' },
			],
		},
		{
			text: 'Sell',
			links: [
				{ name: 'Login', path: '/' },
				{ name: 'Start Selling', path: '/auctions' },
			],
		},
		{
			text: 'Contact Us',
			links: [{ name: 'Chat now', path: '/buyer-dashboard/chat?email=Support@email.com', className: 'SupportLink' }],
		},
	];

	const FooterMoreDetails = FooterMoreDetailsData.map((data, index) => (
		<Col lg={3} sm={4} xs={12} key={index}>
			<FontAwesomeIcon icon={data.icon} className={classes.ContactIcon} />
			<h5 className={data.text === 'Contact Us' && classes.ContactStyle}>
				{' '}
				{data.text}{' '}
			</h5>
			{data.text === 'Contact Us' && (
				<p className={classes.Support}> Questition? We've got answers. </p>
			)}
			<ul>
				{data.links.map((_link, index) => (
					<li key={index}>
						<Link
							to={_link.path}
							className={`text-decoration-none ${
								classes.footerLinks
							} ${_link.className && classes[_link.className]}`}
						>
							{_link.name}
						</Link>
					</li>
				))}
			</ul>
		</Col>
	));

	//end footerMoreDetails

	return (
		<div className={`${classes.Footer} `}>
			{/* start contact details */}
			<div className={classes.ContactUs}>
				<Row className="m-0 p-0">{ContactUs}</Row>
			</div>
			{/* end contact details */}

			{/* start footer links and details */}
			<div className={classes.FooterMoreDetails}>
				<Row className="m-0 p-0">{FooterMoreDetails}</Row>
			</div>
			{/* end footer links and details */}

			<div className={classes.SocialMediaIcons}>
				<p> &copy; 2022 OnlineAuction.com</p>
			</div>
		</div>
	);
}

export default Footer;
