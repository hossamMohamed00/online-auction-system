import React from 'react';
import { FilterComponent } from './filterComponent';
const useFilter = items => {
	const [filterText, setFilterText] = React.useState('');
	const filteredItems = items.filter(
		item =>
			item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = React.useMemo(() => {
		return (
			<FilterComponent
				onFilter={e => setFilterText(e.target.value)} // onchange
				filterText={filterText} //value
			/>
		);
	}, [filterText]);
	return { filterFun: subHeaderComponentMemo, filteredItems: filteredItems };
};
export default useFilter;
