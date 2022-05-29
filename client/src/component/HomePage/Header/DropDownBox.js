import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	faAddressCard,
	faArrowRightFromBracket,
	faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import classes from '../../UI/DropDownBox.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { AuthDataActions } from '../../../store/slices/RegisterSlices/AuthData';

const DropDownBox = props => {
	// const {sendRequest , status} = useHttp(Logout)

	const Navigate = useNavigate();
	const dispatch = useDispatch();

	const [isHiddenDropDownBox, setIsHiddenDropDownBox] = useState(false);
	const role = useSelector(store => store.AuthData.role);

	const profileLink = () => {
		if (role === 'admin') {
			return '/adminDashboard';
		} else if (role === 'buyer') {
			return '/buyer-dashboard';
		} else if(role === 'seller') {
			return '/seller-dashboard';
		}else{
			return '/employeeDashboard';
		}
	};

	// logoutHandler
	const logoutHandler = () => {
		// sendRequest(idToken)
		Navigate('/login');
		dispatch(AuthDataActions.logout());
	};
	const handleShownWallet = () => {
		props.showWalletHandler(true)
		console.log(props.showWalletHandler)
	}

	const showAllLinks = (
		<ul className={`list-group  d-md-block text-start`}>
			<li>
				<Link
					className="px-1 fs-6 text-decoration-none bg-none text-light"
					to={profileLink()}
				>
					<FontAwesomeIcon icon={faAddressCard} className="pe-2" />
					Profile
				</Link>
			</li>
			<li>
				<button
					className="px-1 text-light bg-none "
					type='button'
					onClick={handleShownWallet}
				>
					<FontAwesomeIcon icon={faCartPlus} className="pe-2 text-primary" />
					Wallet
				</button>
			</li>
			<li>
				<button
					className="btn py-0 px-1 text-decoration-none text-danger bg-none fw-bold"
					onClick={logoutHandler}
				>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
						className="pe-2 text-danger"
					/>
					Logout
				</button>
			</li>
		</ul>
	);

	const btnShowCategoryHandler = e => {
		e.preventDefault();
		setIsHiddenDropDownBox(true);
	};

	return (
		<Fragment>
			<div
				className={`${classes.DropDownBox} ${
					isHiddenDropDownBox ? 'd-none' : 'animation-top'
				}`}
			>
				<button
					type="button"
					className="btn-close d-md-none float-end m-2 text-dark bg-light"
					onClick={btnShowCategoryHandler}
					aria-label="Close"
				></button>
				{showAllLinks}
			</div>
		</Fragment>
	);
};

export default DropDownBox;
