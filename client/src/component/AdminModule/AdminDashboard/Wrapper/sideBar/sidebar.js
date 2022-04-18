import React from 'react';

import classes from './sidebar.module.css';
import Dropdown from '../../UI/Dropdown';
import adminImg from '../../../../../assets/icons8-administrator-male-80.png'

const Sidebar = () => {
	const dropdownListForAdmin = ['profile', 'Settings','inbox', 'Logout'];
	const dropdownListManageAuctions = ['Current Auctions', 'Ongoing Auctions'];
	const dropdownListManageUsers = ['Sellers', 'buyers'];
	const dropdownListAuctionsRequests = ['Show auctions requests'];
	return (
		<React.Fragment>
			<div className={classes.sidebar}>
				<div className={classes.adminName}>
					<div className={classes.img}>
						<img src={adminImg} alt="admin" />

					</div>
					<Dropdown
						username="Hossam Mohamed"
						list={dropdownListForAdmin}
						id="admin"
					/>
				</div>
				<ul>
					<li>
						<Dropdown
							username="Manage Auctions"
							list={dropdownListManageAuctions}
							id="auctions"
						/>
					</li>
					<li>
						<Dropdown
							username="Manage Users"
							list={dropdownListManageUsers}
							id="users"
						/>
					</li>
					<li>
						<Dropdown
							username="Auctions Requests"
							list={dropdownListAuctionsRequests}
							id='auctionsRequests'
						/>
					</li>
				</ul>
			</div>
			{/* <i class="fas fa-th"></i> */}
		</React.Fragment>
	);
};
export default Sidebar;

