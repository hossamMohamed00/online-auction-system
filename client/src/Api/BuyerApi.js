
const url = 'http://localhost:8000'

const getAPI = async (url , idToken) => {
	const response = await fetch(url , {
		method: "GET",
		headers: {
			'Authorization' : `Bearer ${idToken}`,
			'Content-Type': 'application/json',
		},
	}
	);
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getWalletBalance = async (idToken) => getAPI(`${url}/wallet/balance` , idToken)

export const RecoverMoneyApi = async ({idToken , paymentIntentId}) => {
	const { success, message , data} = await fetch(
		`${process.env.REACT_APP_API_URL}/wallet/refund?paymentIntentId=${paymentIntentId}`,
		{
			method: 'Get',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${idToken}`,
			},
		},
		).then(res => res.json());

		if (success === false) {
			throw new Error(data.message);
		}
		return message
}