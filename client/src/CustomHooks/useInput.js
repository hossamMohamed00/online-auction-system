import { useState } from 'react';

const useInput = validateInput => {
	const [value, setValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const isValid = validateInput ? validateInput(value) : true ;
	const hasError = isTouched && !isValid;

	const onChangeValueHandler = e => {
		setValue(e.target.value);
	};

	const onBlurHandler = () => {
		setIsTouched(true);
	};

	return {
		value,
		hasError,
		onChangeValueHandler,
		onBlurHandler,
	};
};

export default useInput;
