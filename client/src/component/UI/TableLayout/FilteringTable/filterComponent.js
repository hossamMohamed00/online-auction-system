import React from 'react';
import './filter.css'

export const FilterComponent = props => {
	console.log(props)
	return (
	
			<input  value={props.filterText || ''} onChange={props.onFilter} placeholder='filter by name' />

	);
};
