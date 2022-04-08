import React, { useState, useEffect } from 'react';
import classes from './loginForm.module.css';
import facebookImg from '../../assets/facebook.png';
import googleImg from '../../assets/google-logo-9808.png';
import twitterImg from '../../assets/twitter.png';

const LoginForm = () => {
	// const [userName, setUserName] = useState('');
	// const [usernameIsValid, setUsernameIsValid] = useState(true);
	// const [password, setPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState(true);

	// const formIsValid = usernameIsValid && passwordIsValid;

// 	const userNameHandler = e => {
// 		setUserName(e.target.value);
// 	};
// 	const passwordHandler = e => {
// 		setPassword(e.target.value);
// 	};
// useEffect(()=>{

// 	const validateUsername = () => {
// 		if (userName !== '') {
// 			setUsernameIsValid(true);
// 		}else{
// 			setUsernameIsValid(false);

// 		}
// 	};
// 		const validatePassword = () => {
// 			if ( password.trim().length > 8) {
// 				setPasswordIsValid(true);
// 			}else{
// 				setPasswordIsValid(false);

// 			}
// 		}

// 	validateUsername();
// 	validatePassword();

// },[userName , password])


	return (
		<div className={classes['form-container']}>
			<form>
				<input
					placeholder="Username"
					className={`${classes.input} form-control `}
					// onChange={userNameHandler}
					// onBlur={validateUsername}
				/>
				{/* {!usernameIsValid && <p className="text-danger">Username is invalid</p>} */}

				<input
					type="password"
					placeholder="Password"
					className={`${classes.input} form-control  `}
					// onChange={passwordHandler}
				/>
				{/* {!passwordIsValid && <p className="text-danger">Password is invalid</p>} */}
				<div className={classes.text}>
					<div className={`${classes.checkbox} form-check`}>
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="flexCheckIndeterminate"
						/>
						<label
							className="form-check-label text-light"
							htmlFor="flexCheckIndeterminate"
						>
							Keep me logged in
						</label>
					</div>
					<p className="text-primary"> Forget password ?</p>
				</div>
				<button className="btn btn-primary">Login</button>
			</form>
			<div className={classes.accounts}>
				<img src={facebookImg} />
				<img src={twitterImg} />

				<img src={googleImg} />
			</div>
		</div>
	);
};

export default LoginForm;
