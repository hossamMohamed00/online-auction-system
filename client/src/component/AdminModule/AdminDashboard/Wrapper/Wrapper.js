import React from 'react';

import classes from './wrapper.module.css'
import Sidebar from './sideBar/sidebar'

const Wrapper =() => {


	return(

		<div className={`container-fluid  ${classes.wrapper}`}>

			<div className='row'>
				<div className='col-lg-3 col-md-3 p-0 '>
					<Sidebar/>
				</div>
				<div className='col-lg-8 col-md-8'>
						<h1>PageContent</h1>
			</div>
		</div>
		</div>


		)



}
export default Wrapper;