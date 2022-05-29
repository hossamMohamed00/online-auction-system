const url = 'http://localhost:8000';

const getAPI = async (url, idToken) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${idToken}`,
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const getWalletBalance = async idToken =>
	getAPI(`${url}/wallet/balance`, idToken);
export const getWalletTransactions = async idToken =>
	getAPI(`${url}/wallet/transactions`, idToken);
