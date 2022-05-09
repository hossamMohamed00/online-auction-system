import React, { useState } from "react";
import { NavLink , Link} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowDown , faArrowUp , faBars} from '@fortawesome/free-solid-svg-icons'

import classes from './Navbar.module.css'
import Categories from "../Categories/Categories";

const activeLink = navData => `${navData.isActive ? classes.active : ''} fw-bold ${classes['navLink']} `

const Navbar = ()=> {
	const [isShownNavContent , setisShownNavContent] = useState(false)
	const [isShownCategoriesContent , setisShownCategoriesContent] = useState(false)

	const showNavContentHandeler = () => {
		setisShownNavContent((prevState)=>!prevState )
	}

	const showCategoriesContentHandeler = (e) => {
		console.log("yes")
		e.preventDefault()
		setisShownCategoriesContent((prevState)=>!prevState )
	}

	return (
	<nav className= {`${classes.nav} navbar navbar-dark fixed-top px-1  `}>
			<div className="container-fluid">
				<Link className={` ${classes.navbarBrand} navbar-brand fw-bold `} to="/home-page">Online Aution</Link>

				<FontAwesomeIcon icon={faBars} className= {` ${classes.faBars} float-end text-light d-xs d-md-none pt-1` }
					onClick = {showNavContentHandeler}
				/>

				<div className={`${classes.navLinks} d-md-flex pt-1 position-relative ${isShownNavContent ? 'd-flex' : 'd-xs-none'} `}>
					<NavLink to='/home-page' className= {activeLink} > Home Page </NavLink>
					<NavLink to='/auctions' className= {activeLink} > Auctions </NavLink>
					<NavLink to='/how-bid' className= {activeLink} > How Bid </NavLink>
					<NavLink to='/contact-us' className= {activeLink} > Contact Us </NavLink>

					<div to='/' className= {`text-start pb-0 fw-bold ${classes.navLink} `}
					 onClick = {showCategoriesContentHandeler}
					>
						Categories
						{!isShownCategoriesContent && <FontAwesomeIcon icon={faArrowDown} className="px-2"/>}
						{isShownCategoriesContent && <FontAwesomeIcon icon={faArrowUp} className="px-2"/>}
						{isShownCategoriesContent && <Categories/> }
					</div>

					<NavLink to='/register' className= {`fw-bold ${classes.navLink} ${classes.navLinkRegister } `}> Register </NavLink>
					<NavLink to='/login' className= {`fw-bold text-light ${classes.navLink} ${classes.navLinkLogin } `}> Login </NavLink>

				</div>

			</div>
	</nav>
	)}
export default Navbar;