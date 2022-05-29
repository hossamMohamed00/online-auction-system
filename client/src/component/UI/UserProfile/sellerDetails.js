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
