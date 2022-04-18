import React ,{ Fragment} from "react";
import { Link } from "react-router-dom";
import classes from './Header.module.css'
import Search from "./Seach";

const  Header = () => {
	return (
		<Fragment>

			<div className="position-relative">

				{/* start Navbar  */}
				<nav className= {`${classes.nav} navbar navbar-dark bg-dark fixed-top px-1 `}>
						<div className="container-fluid">
							<a className={` ${classes.navbarBrand} navbar-brand fw-bold `} href="#">Online Aution</a>

							<div className="d-flex pt-1">
								<Link to='/register' className= {`fw-bold ${classes.navLinkRegister} `}> Register </Link>
								<Link to='/login' className= {`fw-bold text-light ${classes.navLinkLogin} `}> Login </Link>

							</div>

						</div>
				</nav>
				{/* end Navbar  */}

				{/* start Header  */}
				<div className= {classes.Header}>
				</div>

				{/* start Header content  */}
				<div className={classes.overlay}>
					<div className={classes.HeaderContent}>
						<div className="mt-5 h-50">
							<h1 className="fw-bold text-light mb-4 fa-1 text-center">Best Place TO Bid Or Sell </h1>
							<Search/>
						</div>

					</div>
				</div>
				{/* end Header content  */}


				{/* end Header  */}





			</div>
		</Fragment>
	);
}

export default Header;