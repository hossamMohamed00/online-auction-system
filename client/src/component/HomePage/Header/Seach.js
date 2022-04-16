import React, { Fragment, useEffect, useRef, useState } from "react";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import classes from './Header.module.css'
import scollbarStyle from '../../UI/ScrollBar.module.css'


const Search = () => {

	const [ResultSearch , setResultSearch ] = useState([])
	const [SearchContent , setSearchContent ] = useState('')
	const [searchFocus 	, setsearchFocus ] = useState(false)

	useEffect(()=>{
		setResultSearch(items=> [...items, SearchContent])

	},[SearchContent])

	const changeHandeler = (e) => {
		setSearchContent(e.target.value)
	}

	const focusHandeler = () => {
		setsearchFocus(true)
	}

	const blurHandeler = (e) => {
		setsearchFocus(false)
	}

	return (
		<Fragment>
			<div className="">

				<div className={classes.Search}>
					<div className="input-group position-relative w-75 m-auto">
						<input type="text" className={` ${classes.SearchInput} form-control `} value={SearchContent} onChange={changeHandeler} onFocus={focusHandeler} onBlur={blurHandeler}/>
						<span className={` ${classes.SearchIcon} input-group-text `}>
							<FontAwesomeIcon icon={faMagnifyingGlass}  />
						</span>
					</div>
					{SearchContent &&
						<div className={`${classes.SearchResult} ${scollbarStyle.scollbar} `}>
							{ResultSearch.map((searchItem , index)=> (
								<p key={index}> {searchItem} </p>
							))}
						</div>
					}

				</div>

			</div>

		</Fragment>
	);
}

export default Search;