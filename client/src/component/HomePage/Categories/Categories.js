import React, { Fragment , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../../Api/CategoryApi';
import useHttp from '../../../CustomHooks/useHttp';
import classes from './Categories.module.css'

const Categories = () => {
	const [isHiddenCategories , setIsHiddenCategories ] = useState(false)

	const {sendRequest , status , data , error } = useHttp(getAllCategories);

	useEffect(()=>{
		sendRequest()
	},[sendRequest])


	const showAllCategories = status === 'completed' && (data || data.length > 0 )  && data.map(( category,index) => {
		return(
			<li key={index} >
				<Link className="p-2 text-decoration-none text-light" to={`/categories?id=${category._id}`} >{category.name} </Link>
			</li>

		)
	})

	const btnShowCategoryHandeler = (e) => {
		e.preventDefault()
		setIsHiddenCategories(true)
		console.log("yes")
	}

		return (
			<Fragment>
				<div className={ `${classes.Categories} ${isHiddenCategories ? 'd-none' : 'animation-top'  }` }>
					<button type="button" className="btn-close d-md-none float-end m-2 text-dark bg-light" onClick={btnShowCategoryHandeler} aria-label="Close"></button>
					<ul className= {`list-group d-md-block  `} >
						{showAllCategories}
					</ul>
				</div>
			</Fragment>
	);
}

export default Categories;