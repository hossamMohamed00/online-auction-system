import { useState } from 'react';

const useInput = vaildteInput => {
	const [value, setValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const isValid = vaildteInput(value);
	const hasError = isTouched && !isValid;

	const onChangeValueHandeler = e => {
		setValue(e.target.value);
	};

	const onBlurHandeler = () => {
		setIsTouched(true);
	};

	return {
		value,
		hasError,
		onChangeValueHandeler,
		onBlurHandeler,
	};
};

export default useInput;
