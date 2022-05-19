import React from 'react';
import { AuthDataActions } from '../../../../store/slices/RegisterSlices/AuthData';

import {Link} from 'react-router-dom'
import classes from './header.module.css';

// import icons and img
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import adminImg from '../../../../assets/icons8-test-account-40.png';

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
					<FontAwesomeIcon icon={faMessage} className={classes.MessgaeIcon}/>
					<span className={classes.bar}></span>
					{/* Notification Icon */}
					<div className='d-inline-block'>
						<FontAwesomeIcon icon={faBell}  className={classes.NotificationIcon}/>
							<span className={`position-absolute translate-middle bg-danger rounded-circle ${classes.NotificationBadge}`}>
    						<span className={classes.NotificationNum}> 3 </span>
  						</span>
					</div>
					{/* <img src={adminImg} className={classes.adminImg} /> */}
					<FontAwesomeIcon icon={faUser} className={` ${classes.adminImg} rounded-circle `} />
					<Link to='/login'className={`${classes.logout} mx-2 ` }onClick={logoutHandler}>Logout</Link>
				</div>
			</div>
		</nav>
	);
};

export default Header;
