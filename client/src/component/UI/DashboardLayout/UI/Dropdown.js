import React from 'react';
import classes from './dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = props => {
	console.log({ data: props.list });

	return (
		<div className={classes.dropdown}>
			<div
				className={`${classes.icon} ${
					classes[props.className ? props.className : '']
				}`}
			>
				<FontAwesomeIcon icon={props.icon ? props.icon : ''} />
			</div>

			<a
				className={`fw-bolder ${classes.username}`}
				href={`#${props.id}`}
				data-bs-toggle="collapse"
				aria-expanded="true"

			>
				<span className={classes.name}>{props.username}</span>
				<span className={classes.dropIcon}>
					<FontAwesomeIcon icon={faCaretDown} />
				</span>
			</a>

			{/* <!-- Collapsible Element HTML --> */}
			{props.list.map(item => {
				return (
					<div class="collapse" id={props.id}>
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
