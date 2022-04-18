import React from 'react';
import classes from './dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Dropdown = props => {
	return (
		<div className={classes.dropdown}>
			<FontAwesomeIcon icon={faUsers} />
			<a
				className={` fw-bolder`}
				href={`#${props.id}`}
				data-bs-toggle="collapse"
			>
				{props.username}
			</a>

			{/* <!-- Collapsible Element HTML --> */}
			{props.list.map(item => {
				return (
					<div class="collapse" id={props.id}>
						<a class={`card card-body fw-bold ${classes.listLink}`}>{item}</a>
					</div>
				);
			})}
		</div>

		// <div className={classes.dropdown}>
		// 	<a
		// 		className={`btn btn-secondary ${classes.link} fw-bolder`}
		// 		data-bs-toggle="collapse"
		// 		href={`#${props.id}`}
		// 		role="button"
		// 		aria-expanded="false"
		// 		aria-controls="collapseExample"
		// 	>
		// 		{props.username}
		// 	</a>
		// 	{props.list.map(item => {
		// 		return (
		// 			<a className="collapse" id={props.id}>
		// 				<i className='fas fa-users'></i>
		// 				<div className={`card card-body fw-bold ${classes.list}`}>{item}</div>
		// 			</a>
		// 		);
		// 	})}
		// </div>
	);
};

export default Dropdown;

// <div class={`dropdown ${classes.dropdown}`}>
// 	<a
// 		class={`btn btn-secondary dropdown-toggle fw-bolder ${classes.link}`}
// 		href="#"
// 		role="button"
// 		id="dropdownMenuLink"
// 		data-bs-toggle="dropdown"
// 		aria-expanded="false"
// 	>

// 		{props.username}
// 	</a>

// 	<ul
// 		class="dropdown-menu dropdown-menu-dark "
// 		aria-labelledby="dropdownMenuLink"
// 	>
// 		{props.list.map(item => (
// 			<li>
// 				<a class="dropdown-item fs-4" href="#">
// 					{item}
// 				</a>
// 			</li>
// 		))}
// 	</ul>
// </div>
