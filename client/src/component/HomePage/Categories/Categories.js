import React, { Fragment , useState} from 'react';
import classes from './Categories.module.css'

const Categories = () => {
	const [isHiddenCategories , setIsHiddenCategories ] = useState(false)

	const AllCategories = ["Labtop" , "Phones" ,"Tablet" ,"Home" , "Electronics"] ;

	const showAllCategories = AllCategories.map(( category,index) => {
		return(
			<li key={index} >
				<span className="p-2">{category} </span>
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