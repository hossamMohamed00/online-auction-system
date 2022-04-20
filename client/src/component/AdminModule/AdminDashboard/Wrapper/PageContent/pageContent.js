import React from 'react';
import Header from '../header/header';

const PageContent =(props)=>{

return (
	<React.Fragment>
			<Header toggleSideBar={props.toggle}/>
			<h1> PageContent</h1>

		<div className='row'></div>
	</React.Fragment>
);

}

export default PageContent;
