export const UpdateAccount = async ({ accountData, idToken, path }) => {
	const response = await fetch(`http://localhost:8000/${path}`, {
		method: 'PATCH',
		body: JSON.stringify(accountData),
		headers: {
			Authorization: `Bearer ${idToken}`,
			'content-type': 'application/json',
		},
	});
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}
};
