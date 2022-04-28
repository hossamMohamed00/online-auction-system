const url = 'http://localhost:8000'

const RegisterUrl 		= `${url}/auth/register `;
const LoginUrl			 	= `${url}/auth/register`;
const ConfirmEmailUrl = `${url}/email-confirmation/confirm`;


export const Register = async (userDetails) => {
    console.log(userDetails)

    const response = await fetch(RegisterUrl, {
        method : 'POST',
        body : JSON.stringify({
					name 		: userDetails.name,
          email 	:userDetails.email ,
          password: userDetails.password,
					role		: userDetails.role,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message);

    }

    return data;
}


export const Login = async (userDetails) => {
	console.log(userDetails)

	const response = await fetch(LoginUrl, {
			method : 'POST',
			body : JSON.stringify({
				email 	:userDetails.email ,
				password: userDetails.password,
			}),
			headers: {
				'Authorization' : `Bearer ${userDetails.idToken}`,
				'Content-Type': 'application/json',
			},
	});
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message);

	}

	return data;
}


export const sendConfiramtion = async (idToken) => {
	console.log(idToken)

	const response = await fetch(ConfirmEmailUrl, {
			method : 'POST',
			body : JSON.stringify({
				token:idToken
			}),
			headers: {
				'Authorization' : `Bearer ${idToken}`,
				'Content-Type': 'application/json',
			},
	});
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message);

	}

	return data;
}
