import React from 'react';
import './filter.css';

export const FilterComponent = props => {
	console.log(props);
	return (
		<input
			className="filter"
			value={props.filterText || ''}
			onChange={props.onFilter}
			placeholder="Filter by name ..."
		/>
	);
};
