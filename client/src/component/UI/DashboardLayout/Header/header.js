import React from 'react';
import { AuthDataActions } from '../../../../store/slices/RegisterSlices/AuthData';

import {Link} from 'react-router-dom'
import classes from './header.module.css';

// import icons and img
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import adminImg from '../../../../assets/icons8-test-account-40.png';

const Header = props => {
	const navClasses = !props.showSideBarValue ? 'w-100' : classes.headerNav;
	const logoutHandler=()=>{
			AuthDataActions.logout();
	}
	return (
		<nav
			className={`navbar navbar-light bg-black  p-2 ${navClasses} fixed-top `}
		>
			<div className="container-fluid  ">
				{/* <div className='d-flex justify-content-between'></div> */}
				<div className="d-flex">
					<button onClick={props.toggleSidebar} className={classes.barBtn}>
						<FontAwesomeIcon icon={faBars} />
					</button>

				</div>
				<div className=" text-light px-2">
					<FontAwesomeIcon icon={faMessage} />
					<span className={classes.bar}></span>
					<FontAwesomeIcon icon={faBell} />
					<img src={adminImg} className={classes.adminImg} />
					<Link to='/login'className={`${classes.logout} mx-2 ` }onClick={logoutHandler}>Logout</Link>
				</div>
			</div>
		</nav>
	);
};

export default Header;
