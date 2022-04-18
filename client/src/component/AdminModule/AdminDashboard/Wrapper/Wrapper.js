import React from 'react';

import classes from './wrapper.module.css';
import Sidebar from './sideBar/sidebar';
import PageContent from './PageContent/pageContent';

const Wrapper = () => {
	return (
		<div className={`container-fluid  ${classes.wrapper}`}>
			<div className="row">
				<div className="col-lg-2 col-md-3 p-0 m-0 ">
					<Sidebar />
				</div>
				<div className="col-lg col-md-9 p-0 m-0">
					<PageContent />
					<h1>PageContent</h1>
				</div>
			</div>
		</div>
	);
};
export default Wrapper;
