import React from 'react';
import classes from './header.module.css';

// import icons and img
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import adminImg from '../../../../../assets/icons8-test-account-40.png';



const Header = props => {
	return (
		<nav class={`navbar navbar-light bg-black  p-2 ${classes.headerNav}  `}>
			<div class="container-fluid ">
				<div className="d-flex">
					<button onClick={props.toggleSideBar} className={classes.barBtn}>
						<FontAwesomeIcon icon={faBars} />
					</button>
					<form class={`d-flex `}>
						<input
							class={`form-control ${classes.search}`}
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
					</form>
				</div>

				<div className=" text-light px-2">
					<FontAwesomeIcon icon={faMessage} />
					<span className={classes.bar}></span>
					<FontAwesomeIcon icon={faBell} />
					<img src={adminImg} className={classes.adminImg}/>
				</div>
			</div>
		</nav>
	);
};

export default Header;
