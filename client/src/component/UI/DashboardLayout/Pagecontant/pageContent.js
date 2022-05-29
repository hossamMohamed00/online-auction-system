import React from 'react';
import classes from './content.module.css';

const PageContent = props => {
	return (
		<React.Fragment>
			<div
<<<<<<< HEAD
				className={`${classes.PageContent} ${props.className ?
					props.className : ''}`}
=======
				className={`${classes.PageContent} ${props.className &&
					props.className}`}
>>>>>>> main
			>
				{/* <h1> PageContent</h1> */}
				{props.children}
			</div>
			{/* <div className='bg-black'>
			<Footer/>
		</div> */}
		</React.Fragment>
	);
};

export default PageContent;
