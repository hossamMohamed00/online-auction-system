import React from 'react';
import classes from './header.module.css'

const Header = () => {

return(
	<nav class={`navbar navbar-light bg-black  p-2 ${classes.headerNav} `}>
  <div class="container-fluid">
    <form class="d-flex">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
      {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
    </form>
  </div>
</nav>

	)


}

export default Header;