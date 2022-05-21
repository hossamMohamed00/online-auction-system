const url = 'http://localhost:8000/admin';

const get = async (url, accessToken) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'content-type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const getAllAuctions = async AccessToken =>
	get(`${url}/auction?populate=true`, AccessToken);
export const getSingleAuction = async auctionId =>
	get(`${url}/${auctionId}?populate=true`);

export const getAllCategoriesForAdmin = async AccessToken =>
	get(`${url}/category`, AccessToken);
export const getCategoryAuctions = async id =>
	get(`${url}/${id}/auctions?populate=true`);
