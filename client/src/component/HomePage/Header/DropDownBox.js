import React, { Fragment , useState} from 'react';
import { Link } from 'react-router-dom';

import  {faAddressCard, faArrowRightFromBracket , faCartPlus} from '@fortawesome/free-solid-svg-icons'
import classes from '../../UI/DropDownBox.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropDownBox = () => {
	const [isHiddenDropDownBox , setIsHiddenDropDownBox ] = useState(false)

	const showAllLinks = <ul className= {`list-group  d-md-block  text-start`} >
		<li>
			<Link className="px-1 fs-6 text-decoration-none text-light" to={`/`} >
				<FontAwesomeIcon icon={faAddressCard} className="pe-2"  />
				Profile
			</Link>
		</li>
		<li>
			<Link className=" px-1 text-decoration-none text-light" to={`/`} >
				<FontAwesomeIcon icon={faCartPlus} className="pe-2 text-primary"  />
				Wallet
			</Link>
		</li>
		<li>
			<Link className="px-1 text-decoration-none text-danger" to={`/`} >
				<FontAwesomeIcon icon={faArrowRightFromBracket} className="pe-2 text-danger" />
				Logout
			</Link>
		</li>
	</ul>

	const btnShowCategoryHandeler = (e) => {
		e.preventDefault()
		setIsHiddenDropDownBox(true)
		console.log("yes")
	}

		return (
			<Fragment>
				<div className={ `${classes.DropDownBox} ${isHiddenDropDownBox ? 'd-none' : 'animation-top'  }` }>
					<button type="button" className="btn-close d-md-none float-end m-2 text-dark bg-light" onClick={btnShowCategoryHandeler} aria-label="Close"></button>
					{showAllLinks}
				</div>
			</Fragment>
	);
}

export default DropDownBox;