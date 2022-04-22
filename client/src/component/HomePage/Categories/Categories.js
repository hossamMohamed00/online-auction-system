import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import classes from './Categories.module.css'

const Categories = () => {

	const AllCategories = ["Labtop" , "Phones" ,"Tablet" ,"Home" , "Electronics"] ;

	const showAllCategories = AllCategories.map(( category,index) => {
		return(
			<li key={index} className={`p-2 ${classes.categories}`}>
				<FontAwesomeIcon icon={faCircleArrowRight} />
				<span className="p-2">{category} </span>
				<span className= {` ${classes.categoryBadge} badge text-light rounded-pill float-end `} >4</span>
			</li>

		)
	})
	return (
			<Fragment>
				<div className={classes.Categories}>
						<h4 className={classes.CategoriesHeader}> Categories</h4>
						<ul className="list-group ">
							{showAllCategories}
						</ul>
				</div>
			</Fragment>
	);
}

export default Categories;