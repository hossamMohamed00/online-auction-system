import React, { useState } from "react";
import { NavLink , Link} from "react-router-dom";
import {useSelector} from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowDown , faArrowUp , faBars , faUser} from '@fortawesome/free-solid-svg-icons'

import Categories from "../Categories/Categories";
import classes from './Navbar.module.css'
import DropDownBox from "./DropDownBox";
import Search from "./Seach";
import { Col, Row } from "react-bootstrap";

const activeLink = navData => `${navData.isActive ? classes.active : ''} fw-bold ${classes['navLink']} `

const Navbar = ()=> {

	const isLoggedIn = useSelector((store)=> store.AuthData.isLoggedIn)

	const [isShownNavContent , setisShownNavContent] = useState(false)
	const [isShownCategoriesContent , setisShownCategoriesContent] = useState(false)
	const [isShownProfileContent , setisShownProfileContent] = useState(false)

	const email = useSelector((store)=> store.AuthData.email)
	const emailName = email && email.substring(0,email.indexOf('@'))

	const showNavContentHandeler = () => {
		setisShownNavContent((prevState)=>!prevState )
	}

	const showCategoriesContentHandeler = (e) => {
		e.preventDefault()
		setisShownCategoriesContent((prevState)=>!prevState )
	}

	const showProfileContentHandeler = (e) => {
		e.preventDefault()
		setisShownProfileContent((prevState)=>!prevState )
	}

	const NavLinks = <> <NavLink to='/home-page' className= {activeLink} > Home Page </NavLink>
		<NavLink to='/auctions' className= {activeLink} > Auctions </NavLink>
		<NavLink to='/how-bid' className= {activeLink} > How Bid </NavLink>
		<NavLink to='/contact-us' className= {activeLink} > Contact Us </NavLink>
	</>

	const showCategories = <div  className= {`text-start pb-0 fw-bold ${classes.navLink} `} onClick = {showCategoriesContentHandeler} >
	 	Categories
	 	{!isShownCategoriesContent && <FontAwesomeIcon icon={faArrowDown} className="px-2"/>}
	 	{isShownCategoriesContent && <FontAwesomeIcon icon={faArrowUp} className="px-2"/>}
	 	{isShownCategoriesContent && <Categories/> }
 	</div>

	const isNotLoggedIn = !isLoggedIn && <>
			<NavLink to='/register' className= {`fw-bold ${classes.navLink} ${classes.navLinkRegister } `}> Register </NavLink>
			<NavLink to='/login' className= {`fw-bold text-light ${classes.navLink} ${classes.navLinkLogin } `}> Login </NavLink>
	</>

	const isLoggedInUser = isLoggedIn && <div  className= {`text-start pb-0 pe-3 fw-bold ${classes.navLink} `} onClick = {showProfileContentHandeler} >
		<FontAwesomeIcon icon={faUser} className="px-1"/> {emailName}
		{isShownProfileContent && <DropDownBox/> }
	</div>


	return (
	<nav className= {`${classes.nav} navbar navbar-dark fixed-top px-1  `}>
			<div className="container-fluid">
				<Row className="w-100 m-0 p-0">
					<Col lg={2} md={3} className="p-0">
						<Link className={` ${classes.navbarBrand} navbar-brand fw-bold `} to="/home-page">
							<span> Online </span> Auction
						</Link>

						<FontAwesomeIcon icon={faBars} className= {` ${classes.faBars} float-end text-light d-xs d-md-none pt-1` } onClick = {showNavContentHandeler} />
					</Col>

					<Col lg={4} md={9}>
						<Search/>
					</Col>

					<Col className={classes.HeaderLinks} lg={6} md={12}>
						<div className={`${classes.navLinks} d-md-flex pt-1 position-relative ${isShownNavContent ? 'd-flex' : 'd-xs-none'} `}>
							{NavLinks}
							{showCategories}
							{isNotLoggedIn}
							{isLoggedInUser}
						</div>
					</Col>
				</Row>




			</div>
	</nav>
	)}
export default Navbar;