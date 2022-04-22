import React from 'react';
import classes from './dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Dropdown = props => {

	console.log(props.list)
	return (
		<div className={classes.dropdown}>
			<div className={`${classes.icon} ${classes[props.className ? props.className:'']}`}>
				<FontAwesomeIcon icon={props.icon ? props.icon :''} />
			</div>

			<a
				className={` fw-bolder ${classes.username}`}
				href={`#${props.id}`}
				data-bs-toggle="collapse"
				aria-expanded="true"
			>
				{props.username}
			</a>

			{/* <!-- Collapsible Element HTML --> */}
			{props.list.map(item => {
				return (
					<div class="collapse mt-3" id={props.id}>
						<div className={classes.linkIcon}>
							<FontAwesomeIcon icon={item.icon ? item.icon : ''} />
						</div>
						<a class={`card card-body fw-bold ${classes.listLink}`}>
							{item.title}
						</a>
					</div>
				);
			})}
		</div>

	);
};

export default Dropdown;

