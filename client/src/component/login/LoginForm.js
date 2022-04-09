import React, { useState, useEffect ,useRef } from 'react';
import classes from './loginForm.module.css';
import facebookImg from '../../assets/facebook.png';
import googleImg from '../../assets/google-logo-9808.png';
import twitterImg from '../../assets/twitter.png';
import Input from '../Register/UI/Input/input';
import Card from '../Register/UI/Card/Card';

const LoginForm = () => {
	const nameRef= useRef();
	const passwordRef = useRef();

	const validateText = value => value.trim() !== '';
	const validatePassword = value => value.trim().length > 4;


	return (
		<div className={classes['form-container']}>
			<Card>
				<form>
					<Input
						type="text"
						placeholder="Username"
						validateText={validateText}
						ref={nameRef}
						errorMassage="please enter your username"
					/>
					<Input
						type="password"
						placeholder="Password"
						validateText={validatePassword}
						ref={passwordRef}
						errorMassage="please enter valid password"
					/>
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
			</Card>
		</div>
	);
};

export default LoginForm;
