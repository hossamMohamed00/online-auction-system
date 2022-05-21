import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './dashboard.module.css';
import Sidebar from './sidebar/sidebar';
import PageContent from './Pagecontant/pageContent';
import Header from './Header/header';

// icons
import {
	faIdBadge,
	faUsers,
	faGavel,
	faTh,
	faListAlt,
	faComment,
	faCreditCardAlt,
} from '@fortawesome/free-solid-svg-icons';

const Wrapper = props => {
	const role = useSelector(store => store.AuthData.role);

	console.log('role2', role, props);
	const sidebarAdmin = props.admin && {
		admin: { list: props.admin.list, name: props.admin.name },
		users: { list: props.users.list, name: props.users.name, icon: faUsers },
		auctions: {
			list: props.auctions.list,
			name: props.auctions.name,
			icon: faGavel,
		},
		requests: {
			list: props.requests.list,
			name: props.requests.name,
			icon: faTh,
		},
		categories: {
			list: props.categories.list,
			name: props.categories.name,
			icon: faListAlt,
		},
	};

	const sidebarBuyer = props.buyer && {
		buyer: { name: props.buyer.name },
		profile: {
			list: props.profile.list,
			name: props.profile.name,
			icon: faIdBadge,
		},
		viewAuctions: {
			list: props.viewAuctions.list,
			name: props.viewAuctions.name,
		},
		chat: { list: props.chat.list, name: props.chat.name, icon: faComment },
		payment: {
			list: props.payment.list,
			name: props.payment.name,
			icon: faCreditCardAlt,
		},
	};

	const sidebarSeller = props.seller && {
		seller: { name: props.seller.name },
		profile: {
			list: props.profile.list,
			name: props.profile.name,
			icon: faIdBadge,
		},
		viewAuctions: {
			list: props.viewAuctions.list,
			name: props.viewAuctions.name,
		},
		chat: { list: props.chat.list, name: props.chat.name, icon: faComment },
		payment: {
			list: props.payment.list,
			name: props.payment.name,
			icon: faCreditCardAlt,
		},
	};
	const sidebarContent = {
		admin: sidebarAdmin,
		seller: sidebarSeller,
		buyer: sidebarBuyer,
	};

	const [showSideBar, setShowSideBar] = useState(true);

	const toggleSidebar = () => {
		setShowSideBar(!showSideBar);
	};
	return (
		<div className={`container-fluid   ${classes.wrapper}  `}>
			<div className="row">
				{showSideBar && (
					<div
						className={` ${
							showSideBar ? classes.showSideBarSmallMedia : ''
						} col-lg-3 col-md-3 p-0 m-0  `}
					>
						<Sidebar sidebarContent={sidebarContent[role]} />
					</div>
				)}

				<div className={`  col-lg col-md p-0 m-0`}>
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
