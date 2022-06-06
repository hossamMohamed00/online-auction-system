const url = 'http://localhost:8000/seller/auction';

export const AddNewAuctionAPI = async ({ AuctionDetails, idToken }) => {
	const formData = new FormData();

	for (let dataKey in AuctionDetails) {
		if (dataKey === 'item') {
			// append nested object
			for (let item in AuctionDetails[dataKey]) {
				console.log('nested', item, AuctionDetails[dataKey][item]);
				formData.append(`item[${item}]`, AuctionDetails[dataKey][item]);
			}
		} else {
			formData.append(dataKey, AuctionDetails[dataKey]);
		}
	}

	console.log({ formData: formData.entries() });

	const response = await fetch(url, {
		method: 'POST',
		body: formData,
		headers: {
			Authorization: `Bearer ${idToken}`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};
