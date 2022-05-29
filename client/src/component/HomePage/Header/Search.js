import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import classes from './Header.module.css';
import scrollbarStyle from '../../UI/ScrollBar.module.css';

const Search = () => {
	const [ResultSearch, setResultSearch] = useState([]);
	const [SearchContent, setSearchContent] = useState('');
	const [searchFocus, setSearchFocus] = useState(false);

	useEffect(() => {
		setResultSearch(items => [...items, SearchContent]);
	}, [SearchContent]);

	const changeHandler = e => {
		setSearchContent(e.target.value);
	};

	const focusHandler = () => {
		setSearchFocus(true);
	};

	const blurHandler = e => {
		setSearchFocus(false);
	};

	return (
		<Fragment>
			<div className="float-right ">
				<div className={classes.Search}>
					<div
						className={` ${classes.SearchInputGroup} input-group position-relative w-100 m-auto `}
					>
						<input
							type="text"
							className={` ${classes.SearchInput} form-control `}
							value={SearchContent}
							onChange={changeHandler}
							onFocus={focusHandler}
							onBlur={blurHandler}
						/>
						<span className={` ${classes.SearchIcon} input-group-text `}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</span>
					</div>
					{SearchContent && (
						<div
							className={`${classes.SearchResult} ${scrollbarStyle.scrollbar} `}
						>
							{ResultSearch.map((searchItem, index) => (
								<p key={index}> {searchItem} </p>
							))}
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Search;
