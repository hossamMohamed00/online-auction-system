import React, { useState } from 'react';

import classes from './dashboard.module.css';
import Sidebar from './sidebar/sidebar';
import PageContent from './Pagecontant/pageContent';
import Header from './Header/header'

const Wrapper = (props) => {
	const [showSideBar, setShowSideBar] = useState(true);

	const toggleSidebar = () => {
		setShowSideBar(!showSideBar);
	};
	return (
		<div className={`container-fluid  ${classes.wrapper} `}>
			<div className="row">
				{showSideBar && (
					<div className="col-lg-3 col-md-3 p-0 m-0 ">
						<Sidebar />
					</div>
				)}

				<div className="col-lg col-md p-0 m-0">
					<Header toggleSidebar={toggleSidebar} />
					{props.children}
				</div>
			</div>
		</div>
	);
};
export default Wrapper;
