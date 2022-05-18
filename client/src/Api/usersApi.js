const url = 'http://localhost:8000';

export const getUsers = async (requestData) => {
	const response = await fetch(`${url}/${requestData.path}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': `Bearer ${requestData.idToken}`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};
