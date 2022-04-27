import React, { useState } from "react";
import { NavLink , Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAnglesDown , faAnglesUp , faBars} from '@fortawesome/free-solid-svg-icons'

import classes from './Navbar.module.css'
import Categories from "../Categories/Categories";

const activeLink = navData => `${navData.isActive ? classes.active : ''} fw-bold ${classes['navLink']} `

const Navbar = ()=> {
	const [isShowanNavContent , setIsShowanNavContent] = useState(false)
	const [isShowanCategoriesContent , setIsShowanCategoriesContent] = useState(false)

	const showNavContentHandeler = () => {
		setIsShowanNavContent((prevState)=>!prevState )
	}

	const showCategoriesContentHandeler = (e) => {
		console.log("yes")
		e.preventDefault()
		setIsShowanCategoriesContent((prevState)=>!prevState )
	}

	return (
	<nav className= {`${classes.nav} navbar navbar-dark fixed-top px-1 `}>
			<div className="container-fluid">
				<Link className={` ${classes.navbarBrand} navbar-brand fw-bold `} to="/home-page">Online Aution</Link>

				<FontAwesomeIcon icon={faBars} className= {` ${classes.faBars} float-end text-light d-xs d-md-none pt-1` }
					onClick = {showNavContentHandeler}
				/>

				<div className={`${classes.navLinks} d-md-flex pt-1 ${isShowanNavContent ? 'd-flex' : 'd-xs-none'} `}>
					<NavLink to='/home-page' className= {activeLink} > Home Page </NavLink>
					<NavLink to='/about-us' className= {activeLink} > About Us </NavLink>
					<NavLink to='/how-bid' className= {activeLink} > How Bid </NavLink>
					<NavLink to='/contact-us' className= {activeLink} > Contact Us </NavLink>

					<span to='/' className= {`text-start pb-0 fw-bold ${classes.navLink} `}
					 onClick = {showCategoriesContentHandeler}
					>
						Categories
						{!isShowanCategoriesContent && <FontAwesomeIcon icon={faAnglesDown} className="px-2"/>}
						{isShowanCategoriesContent && <FontAwesomeIcon icon={faAnglesUp} className="px-2"/>}
						{isShowanCategoriesContent && <Categories/> }
					</span>

					<NavLink to='/register' className= {`fw-bold ${classes.navLink} ${classes.navLinkRegister } `}> Register </NavLink>
					<NavLink to='/login' className= {`fw-bold text-light ${classes.navLink} ${classes.navLinkLogin } `}> Login </NavLink>

				</div>

			</div>
	</nav>
	)}
export default Navbar;