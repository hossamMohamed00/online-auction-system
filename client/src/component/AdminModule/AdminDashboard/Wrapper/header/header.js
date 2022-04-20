import React from 'react';
import classes from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faBars} from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {

return (
	<nav class={`navbar navbar-light bg-black  p-2 ${classes.headerNav} `}>
		<div class="container-fluid">
			<button onClick={props.toggleSideBar} className={classes.barBtn}>
				<FontAwesomeIcon icon={faBars} />
			</button>
			<form class="d-flex">
				<input
					class="form-control"
					type="search"
					placeholder="Search"
					aria-label="Search"
				/>
				{/* <button class="btn btn-outline-success" type="submit">Search</button> */}
			</form>
		</div>
	</nav>
);


}

export default Header;