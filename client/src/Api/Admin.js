const url = 'http://localhost:8000/admin';

// get
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

export const getAllAuctions = async ({ idToken, status }) => {
	return !status
		? get(`${url}/auction?populate=true`, idToken)
		: get(`${url}/auction?populate=true&status=${status}`, idToken);
};
export const getSingleAuction = async auctionId =>
	get(`${url}/${auctionId}?populate=true`);

export const getAllCategoriesForAdmin = async AccessToken =>
	get(`${url}/category`, AccessToken);
export const getCategoryAuctions = async id =>
	get(`${url}/${id}/auctions?populate=true`);
export const getEmployees = async AccessToken =>
	get(`${url}/employee`, AccessToken);

// remove
export const remove = async ({ path, accessToken}) => {
	const response = await fetch(`${url}/${path}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'content-type': 'application/json',
		},
	});
	const data = await response.json();

	if (!response.ok) {
		console.log('failed');
		throw new Error(data.message);
	}
};

// get dashboard data

export const getDashboardData = async accessToken => {
	const response = await fetch(`${url}/dashboard`, {
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
export const getWinners = async accessToken => {
	const response = await fetch(`${url}/dashboard/winners`, {
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
export const getTopAuctions = async accessToken => {
	const response = await fetch(`${url}/dashboard/auctions?top=3`, {
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
export const getProfileData = async accessToken => {
	const response = await fetch(`http://localhost:8000/auth/profile`, {
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

/********************************************************* */
/* ******** Start Warning ********* */

// start get warn reasons
export const getReasons = async ({accessToken,Type}) => {
	const response = await fetch(`${url}/get-enum-values?enumName=${Type==='Warn' ? 'WarningMessagesEnum': 'BlockUserReasonsEnum'}`, {
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
// end get warn reasons

// start warn user
export const Warn_Or_Block_User = async ({accessToken , id , SelectedMessage_ , Type}) => {
	const response = await fetch(`${url}/users/${Type==='Warn' ? 'warn' : 'block'}?id=${id}`, {
		method: 'POST',
		body: JSON.stringify(SelectedMessage_),
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
// end warn user

// start Remove Warning Badge
export const Remove_Warning_Or_Blocking_Badge = async ({accessToken , id , Type}) => {
	const response = await fetch(`${url}/users/${Type==='Warn' ? 'remove-warn' : 'unblock'}?id=${id}`, {
		method: 'POST',
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
// end Remove Warning Badge


/* ******** end Warning ********* */
/********************************************************* */



// get all complaints
export const getAllComplaints = async ({ idToken, path }) => {
	const response = await fetch(
		`${url}/${path}`,
		{
			method: 'GET',
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
