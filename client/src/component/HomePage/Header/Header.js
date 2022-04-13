import React ,{ Fragment} from "react";
import classes from './Header.module.css'

const  Header = () => {
	return (
		<Fragment>
			<div className= {classes.Header}>
				<h1> Header </h1>

			</div>
		</Fragment>
	);
}

export default Header;