import React from 'react';

import classes from './sidebar.module.css';
import Dropdown from '../UI/Dropdown';
import adminImg from '../../../../assets/icons8-test-account-40.png';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
// import { faTh } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
// import { faListAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = props => {
	let user = props.sidebarContent;
	console.log("user" , user)
	const userName = Object.keys(user)[0];
	console.log( userName , Object.entries(user) , Object.entries(user)[0]);


	return (
		<React.Fragment>
			<div className={`${classes.sidebar}  position-relative animation-from-left`}>
				<div className={`${classes.logo}  text-center `}>
					<h2 className="text-light  mt-3  ">
						On<span>Line Auction</span>
					</h2>
				</div>

				<div className={classes.adminName}>
					<div className={classes.img}>
						<img src={adminImg} alt="admin" />
					</div>
					<div className={classes.username}>
						<Dropdown
							username={user[userName].name}
							list={user[userName].list}
							id="admin"
						/>
					</div>
				</div>
				<ul>
					{delete user['admin']}
					{Object.entries(user).map((user , index) => {
						// let counter = 1;
						console.log(user);
						return (
							<li key={index}>
								<Dropdown
									username={user[1].name}
									list={user[1].list}
									id={`auctions_${index}`}
									icon={user[1].icon ? user[1].icon : faGavel}
									className="auction"
								/>
							</li>
						);
					})}
					{/* <li>
						<Dropdown
							username={user.auctions.name}
							list={user.auctions.list}
							id="auctions"
							icon={faGavel}
							className="auction"
						/>
					</li>
					<li>
						<Dropdown
							username={user.users.name}
							list={user.users.list}
							id="users"
							icon={faUsers}
							className="users"
						/>
					</li>
					<li>
						<Dropdown
							username={user.requests.name}
							list={user.requests.list}
							id="auctionsRequests"
							icon={faTh}
							className="requests"
						/>
					</li>
					<li>
						<Dropdown
							username={user.categories.name}
							id="categories"
							list={user.categories.list}
							icon={faListAlt}
							className="categories"
						/>
					</li> */}
				</ul>
			</div>
		</React.Fragment>
	);
};
export default Sidebar;
