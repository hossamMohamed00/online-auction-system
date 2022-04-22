import React from 'react';

import classes from './sidebar.module.css';
import Dropdown from '../UI/Dropdown';
import adminImg from '../../../../assets/icons8-test-account-40.png';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
	const dropdownListForAdmin = [
		{ title: 'Profile', icon: faUser },
		{ title: 'Settings', icon: faGears },
		{ title: 'Inbox', icon: faMessage },
		{ title: 'Logout', icon: faPowerOff },
	];
	const dropdownListManageAuctions = [
		{ title: 'Current Auctions', icon: faGavel },
		{ title: 'Ongoing Auctions', icon: faGavel },
	];

	const dropdownListManageUsers = [
		{ title: 'Sellers', icon: faUser },
		{ title: 'Buyers', icon: faUser },
	];
	const dropdownListAuctionsRequests = [
		{ title: 'Pending auctions', icon: faTh },
	];
	const dropdownListManageCategories = [];
	return (
		<React.Fragment>
			<div className={`${classes.sidebar}  position-relative`}>
				<div className={`${classes.logo}  text-center `}>
					<h2 className="text-light  mt-3  ">
						On<span className="text-danger">Line Auction</span>
					</h2>
				</div>

				<div className={classes.adminName}>
					<div className={classes.img}>
						<img src={adminImg} alt="admin" />
					</div>
					<div className={classes.username}>
						<Dropdown
							username="Safa Ramadan"
							list={dropdownListForAdmin}
							id="admin"
						/>
					</div>
				</div>
				<ul>
					<li>
						<Dropdown
							username="Manage Auctions"
							list={dropdownListManageAuctions}
							id="auctions"
							icon={faGavel}
							className="auction"
						/>
					</li>
					<li>
						<Dropdown
							username="Manage Users"
							list={dropdownListManageUsers}
							id="users"
							icon={faUsers}
							className="users"
						/>
					</li>
					<li>
						<Dropdown
							username="Auctions Requests"
							list={dropdownListAuctionsRequests}
							id="auctionsRequests"
							icon={faTh}
							className="requests"
						/>
					</li>
					<li>
						<Dropdown
							username="Manage Categories"
							id="categories"
							list={dropdownListManageCategories}
							icon={faListAlt}
							className="categories"
						/>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
};
export default Sidebar;
