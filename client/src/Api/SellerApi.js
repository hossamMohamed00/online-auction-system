const url = 'http://localhost:8000/seller/auction';

export const AddNewAuctionAPI = async ({ AuctionDetails, idToken }) => {
	console.log(idToken, AuctionDetails);
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(AuctionDetails),
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
