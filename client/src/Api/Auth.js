const url = 'http://localhost:8000';

const RegisterUrl = `${url}/auth/register `;
const LoginUrl = `${url}/auth/login`;
const ConfirmEmailUrl = `${url}/email-confirmation/confirm`;
const LogoutUrl = `${url}/auth/logout`;

export const Register = async userDetails => {
	const response = await fetch(RegisterUrl, {
		method: 'POST',
		body: JSON.stringify({
			name: userDetails.name,
			email: userDetails.email,
			password: userDetails.password,
			role: userDetails.role,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};

export const Login = async userDetails => {
	const response = await fetch(LoginUrl, {
		method: 'POST',
		body: JSON.stringify({
			email: userDetails.email,
			password: userDetails.password,
		}),
		headers: {
			Authorization: `Bearer ${userDetails.idToken}`,
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
};

export const sendConfirmation = async idToken => {
	const response = await fetch(ConfirmEmailUrl, {
		method: 'POST',
		body: JSON.stringify({
			token: idToken,
		}),
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

// start reset-password
export const ResetPassword = async ({email}) => {
	const response = await fetch(`${url}/auth/reset-password`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok || data.success===false) {
		throw new Error(data.message);
	}


	return data;
};
// end reset-password
// /reset-password/confirm-code

// start Check Confirmation Code
export const confirmChangePasswordCode = async ({verificationCode , email}) => {
	const response = await fetch(`${url}/reset-password/confirm-code`, {
		method: 'POST',
		body: JSON.stringify({
			verificationCode: verificationCode,
			email : email
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok || data.success===false) {
		throw new Error(data.message);
	}
	return data;
};
// end Check Confirmation Code



// start Check Confirmation Code
export const ChangeTONewPassword = async ({verificationCode , email , password}) => {
	const response = await fetch(`${url}/auth/reset-password`, {
		method: 'PATCH',
		body: JSON.stringify({
			email : email,
			verificationCode: verificationCode,
			password : password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (!response.ok || data.success === false) {
		throw new Error(data.message);
	}
	return data;
};
// end Check Confirmation Code

export const Logout = async idToken => {
	const response = await fetch(LogoutUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${idToken}`,
			'Content-Type': 'application/json',
		},
	});
	if (!response.ok) {
		throw new Error(response.json().message);
	}
};


