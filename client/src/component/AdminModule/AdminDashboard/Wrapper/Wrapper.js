import React,{useState} from 'react';

import classes from './wrapper.module.css';
import Sidebar from './sideBar/sidebar';
import PageContent from './PageContent/pageContent';


const Wrapper = () => {

	const [showSideBar , setShowSideBar]=useState(true);

	const toggle =()=>{

			setShowSideBar(!showSideBar);
	}
	return (
		<div className={`container-fluid  ${classes.wrapper}`}>
			<div className="row">
				{showSideBar && (
					<div className="col-lg-3 col-md-3 p-0 m-0 ">
						<Sidebar />
					</div>
				)}

				<div className="col-lg col-md-9 p-0 m-0">
					<PageContent toggle={toggle} />
				</div>
			</div>
		</div>
	);
};
export default Wrapper;
