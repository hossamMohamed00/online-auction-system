import {
	faComment,
	faEnvelope,
	faLocationDot,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import style of Contact us
import classes from './ContactDetails.module.css';

const ContactDetails = () => {
	const role = useSelector(store => store.AuthData.role);
	return (
		<React.Fragment>
			<div className={` ${classes.ContactDetails} p-0`}>
				<h4 className="text-center"> Contact Details</h4>

				<div className="mt-2">
					<FontAwesomeIcon
						icon={faLocationDot}
						className={classes.ContactIcon}
					/>
					<p> Company Address </p>
				</div>
				<div className="mt-2">
					<FontAwesomeIcon icon={faPhone} className={classes.ContactIcon} />
					<p> (+20) 12547554 </p>
				</div>
				<div className="mt-2">
					<FontAwesomeIcon icon={faEnvelope} className={classes.ContactIcon} />
					<p> onlineAuction@email.com </p>
				</div>

				<div
					className={
						role === 'seller' || role === 'buyer' ? 'd-block mt-2' : 'd-none'
					}
				>
					<FontAwesomeIcon icon={faComment} className={classes.ContactIcon} />
					<p> you can chat with Administrator</p>
					<Link
						className={`${classes.ChatNow} `}
						to={`${
							role === 'buyer'
								? '/buyer-dashboard/chat?email=Support@email.com'
								: '/seller-dashboard/chat?email=Support@email.com'
						} `}
					>
						{' '}
						Chat Now{' '}
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ContactDetails;
