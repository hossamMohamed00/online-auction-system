import React, { useState } from 'react';
import {useSelector} from 'react-redux'

import classes from './dashboard.module.css';
import Sidebar from './sidebar/sidebar';
import Header from './Header/header';

// icons
import { faIdBadge, faUsers , faGavel , faTh, faListAlt, faComment, faCreditCardAlt} from '@fortawesome/free-solid-svg-icons';


const Wrapper = props => {
	const role = useSelector(store => store.AuthData.role);

	// console.log("role2" , role , props)
	const sidebarAdmin = role ==='admin' && {
		admin: { list: props.admin.list, name: props.admin.name },
		employees: {
			list: props.Employees.list,
			name: props.Employees.name,
			icon: faUsers,
			class: 'users',
		},
		users: {
			list: props.users.list,
			name: props.users.name,
			icon: faUsers,
			class: 'users',
		},
		auctions: {
			list: props.auctions.list,
			name: props.auctions.name,
			icon: faGavel,
			class: 'auctions',
		},
		requests: {
			list: props.requests.list,
			name: props.requests.name,
			icon: faTh,
			class: 'requests',
		},
		categories: {
			list: props.categories.list,
			name: props.categories.name,
			icon: faListAlt,
			class: 'categories',
		},
	};

	const sidebarBuyer = role === 'buyer' && {
		buyer					: { name: props.buyer.name },
		profile				: { list: props.profile.list, name: props.profile.name , icon:faIdBadge },
		viewAuctions	: { list: props.viewAuctions.list,  name: props.viewAuctions.name },
		chat					: { list: props.chat.list,  name: props.chat.name , icon:faComment },
		payment				: { list: props.payment.list,  name: props.payment.name  , icon:faCreditCardAlt},
	}

	const sidebarSeller = role === 'seller' && {
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
		payment: {
			list: props.payment.list,
			name: props.payment.name,
			icon: faCreditCardAlt,
		},
		SellerChat: { list: props.SellerChat && props.SellerChat.list, name: props.SellerChat && props.SellerChat.name, icon: faComment },
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
						<Sidebar sidebarContent={sidebarContent[role]} role={role} />
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
