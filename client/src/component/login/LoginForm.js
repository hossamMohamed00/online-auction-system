import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AuthDataActions } from '../../store/slices/RegisterSlices/AuthData';
import { Login } from '../../Api/Auth';
import useHttp from '../../CustomHooks/useHttp';

import Input from '../UI/Input/input';
import Card from '../UI/Card/Card';
import classes from './loginForm.module.css';

//images
import facebookImg from '../../assets/facebook.png';
import googleImg from '../../assets/google-logo-9808.png';
import twitterImg from '../../assets/twitter.png';
import { toast , ToastContainer} from 'react-toastify';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { sendRequest, status, data, error } = useHttp(Login);
	const idToken = useSelector(store => store.AuthData.idToken);

	const nameRef = useRef();
	const passwordRef = useRef();

	const validateEmail = value => value.trim().includes('@');
	const validatePassword = value => value.trim().length > 4;

	useEffect(() => {
		if (status === 'completed') {
			const email = nameRef.current.value;
			dispatch(
				AuthDataActions.login({
					idToken: data.accessToken,
					role: data.role,
					email: email,
				}),
			);
			toast.success('Login Successfully ❤️‍🔥 ')
			const timer = setTimeout(()=>{
				if (data.role === 'buyer') {
					navigate('/home-page');
				} else if (data.role === 'admin') {
					navigate('/adminDashboard');
				} else if (data && data.role === 'seller') {
					navigate('/seller-dashboard');
				}
				if (data && data.role === 'employee') {
					navigate('/employeeDashboard');
				}
			},1000)

			return ()=> clearTimeout(timer)
		}
	}, [status]);

	const submitHandler = e => {
		e.preventDefault();
		const userDetails = {
			email: nameRef.current.value,
			password: passwordRef.current.value,
			idToken,
		};
		sendRequest(userDetails);
	};


	useEffect(()=>{
		if(status==='error'){
			toast.error(error)
		}
	},[status])


	return (
		<div className={classes['form-container']}>
			<ToastContainer theme='dark'/>
			<Card className={'loginCard'}>
				<form onSubmit={submitHandler}>
					<Input
						type="email"
						placeholder="Email"
						validateText={validateEmail}
						ref={nameRef}
						errorMassage="please enter your email"
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
					{/* {error && (
						<p className={`${classes.alert} p-2 text-center fs-6 `}>
							{' '}
							{error}{' '}
						</p>
					)} */}

					<button className="btn btn-primary" onSubmit={submitHandler}>
						Login
					</button>
				</form>
				<div className={classes.accounts}>
					<img src={facebookImg} alt="facebookImg" />
					<img src={twitterImg} alt="twitterImg" />
					<img src={googleImg} alt="googleImg" />
				</div>
			</Card>
		</div>
	);
};

export default LoginForm;
