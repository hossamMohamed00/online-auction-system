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

export const getBuyerReview = async ({ sellerId, idToken }) => {
					const response = await fetch(
						`http://localhost:8000/buyer/review?sellerId=${sellerId}`,
						{
							method: 'Get',

							headers: {
								Authorization: `Bearer ${idToken}`,
								'content-type': 'application/json',
							},
						},
					);
					const data = await response.json();
					if (!response.ok) {
						throw new Error(data.message);
					}
					return data;
				};
