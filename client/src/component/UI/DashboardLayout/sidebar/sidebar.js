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
const Sidebar = props => {
	const { Admin } = props.sidebarContent;
	console.log(Admin.admin.list);
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
							username={Admin.admin.name}
							list={Admin.admin.list}
							id="admin"
						/>
					</div>
				</div>
				<ul>
					<li>
						<Dropdown
							username={Admin.auctions.name}
							list={Admin.auctions.list}
							id="auctions"
							icon={faGavel}
							className="auction"
						/>
					</li>
					<li>
						<Dropdown
							username={Admin.users.name}
							list={Admin.users.list}
							id="users"
							icon={faUsers}
							className="users"
						/>
					</li>
					<li>
						<Dropdown
							username={Admin.requests.name}
							list={Admin.requests.list}
							id="auctionsRequests"
							icon={faTh}
							className="requests"
						/>
					</li>
					<li>
						<Dropdown
							username={Admin.categories.name}
							id="categories"
							list={Admin.categories.list}
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
