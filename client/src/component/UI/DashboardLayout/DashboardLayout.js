import React, { useState } from 'react';

import classes from './dashboard.module.css';
import Sidebar from './sidebar/sidebar';
import PageContent from './Pagecontant/pageContent';
import Header from './Header/header';

const Wrapper = props => {
	const sidebarContent = {
		Admin: {
			admin: { list: props.admin.list, name: props.admin.name },
			users: { list: props.users.list, name: props.users.name },
			auctions: { list: props.auctions.list, name: props.auctions.name },
			requests: { list: props.requests.list, name: props.requests.name },
			categories: { list: props.categories.list, name: props.categories.name },
		},
		Seller: {},
		Buyer: {},
	};

	const [showSideBar, setShowSideBar] = useState(true);

	const toggleSidebar = () => {
		setShowSideBar(!showSideBar);
	};
	return (
		<div className={`container-fluid  ${classes.wrapper} `}>
			<div className="row">
				{showSideBar && (
					<div className="col-lg-3 col-md-3 p-0 m-0 ">
						<Sidebar sidebarContent={sidebarContent} />
					</div>
				)}

				<div className="col-lg col-md p-0 m-0">
					<Header
						toggleSidebar={toggleSidebar}
						showSideBarValue={showSideBar}
					/>
					{props.children}
				</div>
			</div>
		</div>
	);
};
export default Wrapper;
