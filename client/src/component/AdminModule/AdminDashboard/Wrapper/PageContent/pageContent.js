import React from 'react';
import Header from '../header/header';
import classes from './content.module.css'

const PageContent =(props)=>{

return (
	<React.Fragment>
		<Header toggleSideBar={props.toggle} />

		<div className={classes.PageContent}>
			<h1> PageContent</h1>
		</div>
	</React.Fragment>
);

}

export default PageContent;
