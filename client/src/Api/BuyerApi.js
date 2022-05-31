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

export const getJoinedAuctions = async (id) => {
		const response = await fetch(`${url}/buyer/profile/${id}`, {
			method: 'GET'
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}
		return data;
};


export const SaveAuctionApi = async ({idToken , id}) => {
	const response = await fetch(`${url}/buyer/auction/save/${id}`, {
		method: 'POST',
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

export const viewSaveAuctionApi = async (idToken) => {
	const response = await fetch(`${url}/buyer/auctions?populateField=savedAuctions`, {
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

