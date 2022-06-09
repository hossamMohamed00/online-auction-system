const url = 'http://localhost:8000';

export const getUsers = async requestData => {
	const response = await fetch(`${url}/${requestData.path}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${requestData.idToken}`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const SubmitComplaintInSystem = async CompliantDetails => {
	const response = await fetch(`${url}/complaint/submit-on-system`, {
		method: 'POST',
		body: JSON.stringify(CompliantDetails),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
};


export const getUserProfile = async ({role , id}) => {
	const response = await fetch(`http://localhost:8000${((role==='seller' && `/seller/profile/${id}` )||(role==='buyer' && `/buyer/profile/${id}`))}`)
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}
	return data
};

