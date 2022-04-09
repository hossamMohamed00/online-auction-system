import React, { Fragment } from "react";
import RegisterContent from "../RegisterContent/RegisterContent";
import RegisterHeader from "../RegisterHeader/RegisterHeader";
import classes from './Layout.module.css'

const Layout = () => {
	return (
			<Fragment>
				<div className={`${classes.Register} text-center h-100`}>
					<div className="container-fluid p-0 h-100 " >
							<div className="row m-0 p-0 h-100">

								<div className={` ${classes['register-bg']} col-lg-7 col-xs-12 position-relative pl-0 px-0`}>
									<div className={` ${classes['register-bg-overlay']}  w-100 h-100 position-absolute `}></div>
									<div className={classes.background}> </div>
								</div>

								<div className={` ${classes['register-content']} col-lg-5 col-xs-12 pl-0 px-0 `}>
										<RegisterHeader  />
										<RegisterContent />
								</div>
							</div>
					</div>
				</div>

			</Fragment>
	)
}

export default Layout ;