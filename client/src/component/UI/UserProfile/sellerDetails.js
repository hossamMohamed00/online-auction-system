export const getProfileData = async SellerId => {
	const response = await fetch(
		`http://localhost:8000/seller/profile/${SellerId}`,
	);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const AddReviewForSeller = async ({ idToken, reviewData }) => {
	const response = await fetch(`http://localhost:8000/buyer/review`, {
		method: 'POST',
		body: JSON.stringify(reviewData),
		headers: {
			Authorization: `Bearer ${idToken}`,
			'content-type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

