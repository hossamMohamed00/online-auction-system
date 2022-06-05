import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdateAccount } from '../../Modules/SellerModule/sellerApi';
import PageContent from '../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../UI/Page Header/pageHeader';
import userImg from '../../../assets/user.png';
import classes from './UpdateAccount.module.css';
import Input from '../../UI/Input/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen, faUserPen } from '@fortawesome/free-solid-svg-icons';
import useHttp from '../../../CustomHooks/useHttp';
import { toast, ToastContainer } from 'react-toastify';

const UpdateAccountForUsers = () => {
	const idToken = useSelector(store => store.AuthData.idToken);

	const role = useSelector(store => store.AuthData.role);
	const email = useSelector(store => store.AuthData.email);
	const phoneNumber = useRef();
	const nameRef = useRef();
	const addressRef = useRef();
	const validateText = value => value !== '';
	const ImageRef = useRef();
	const { data, sendRequest, error, status } = useHttp(UpdateAccount);
	const ChangeImageHandler = e => {
		ImageRef.current.click();
	};

	const submitHandler = e => {
		e.preventDefault();
		const accountData = {
			name: nameRef.current.value,
			phoneNumber: phoneNumber.current.value.trim(),
			address: addressRef.current.value,
		};
		sendRequest({accountData, idToken, path:'seller/profile'});
	};

React.useEffect(() => {
		if (status === 'completed') {
			toast.success('Account Updated Successfully');
		}else{
			toast.error(error);
		}
	},[status])

	return (
		<>
			<PageContent className={classes.PageContentStyle}>
				<ToastContainer theme='dark'/>
				<PageHeader text="Edit Your Account" />
				<form className="container-fluid" onSubmit={submitHandler}>
					<section className="header_container position-relative">
						<div className={`${classes.UpdateAccount} `}>
							<img src={userImg} className={classes.imageProfile} />
							<button
								className={`btn ${classes.btnChangeImage}`}
								onClick={ChangeImageHandler}
							>
								<FontAwesomeIcon icon={faSquarePen} />
								<input type="file" className="d-none" ref={ImageRef} />
							</button>
						</div>
						{/* E-mail And Role Number */}
						<div className="row my-4">
							<div className={'col-6  text-light fw-bold fs-5 py-2'}>
								<label>E-mail : {email} </label>
							</div>
							<div className={'col-6 text-light fw-bold fs-5 py-2 '}>
								<label> Type : {role}</label>
							</div>
						</div>
						{/* Name And Phone Number */}
						<div className="row">
							<div className={`col-lg-6`}>
								<label
									for="UserName"
									className={'text-light fw-bold fs-5 py-2'}
								>
									User Name
								</label>
								<Input
									type="text"
									placeholder=""
									validateText={validateText}
									ref={nameRef}
									errorMassage="please enter 	Your Number "
									inputValue=" Phone"
									id="UserName"
									// disabled
								/>
							</div>
							<div className={`col-lg`}>
								<label
									for="PhoneNumber "
									className={'text-light fw-bold fs-5 py-2'}
								>
									Phone Number
								</label>
								<Input
									type="text"
									placeholder=""
									validateText={validateText}
									ref={phoneNumber}
									errorMassage="please enter your Address "
									inputValue=" prudect Name"
									id="PhoneNumber "
								/>
							</div>
						</div>

						{/* National Number And Address */}
						<div className="row">

							<div className={`col-lg-6 `}>
								<label for="Address" className={'text-light fw-bold fs-5 py-2'}>
									Address
								</label>
								<Input
									type="text"
									placeholder=""
									validateText={validateText}
									ref={addressRef}
									errorMassage="please enter your Address "
									inputValue=" prudect Name"
									id="Address"
								/>
							</div>
						</div>
						{/*  Birthday and Current Password */}
						<div className="row">
							<div className={`col-lg-6`}>
								<label
									for="Birthday"
									className={'text-light fw-bold fs-5 py-2'}
								>
									Birthday
								</label>
								<Input
									type="date"
									placeholder=""
									validateText={validateText}
									ref={nameRef}
									errorMassage="please enter 	Your Birthday "
									inputValue=" Phone"
									id="Birthday"
								/>
							</div>
							<div className={`col-lg`}>
								<label
									for="CurrentPassword"
									className={'text-light fw-bold fs-5 py-2'}
								>
									Current Password
								</label>
								<Input
									type="password"
									placeholder=""
									validateText={validateText}
									ref={phoneNumber}
									errorMassage="please Enter Your Current Password "
									inputValue=" "
									id="CurrentPassword"
								/>
							</div>
						</div>
						{/* New Password and confirm it */}
						<div className="row">
							<div className={`col-lg-6`}>
								<label
									for="NewPassword"
									className={'text-light fw-bold fs-5 py-2'}
								>
									New Password
								</label>
								<Input
									type="password"
									placeholder=""
									validateText={validateText}
									ref={nameRef}
									errorMassage="please enter 	Your New Password "
									inputValue=" Phone"
									id="NewPassword"
								/>
							</div>
							<div className={`col-lg`}>
								<label for="Confirm" className={'text-light fw-bold fs-5 py-2'}>
									Confirm New Password
								</label>
								<Input
									type="password"
									placeholder=""
									validateText={validateText}
									ref={phoneNumber}
									errorMassage="please Confirm New Password "
									inputValue=" prudect Name"
									id="Confirm"
								/>
							</div>
						</div>
						{/* Save Changes Button */}
						<button className={`btn btn-danger ${classes.bntstyl}`}>
							Save Changes
						</button>
					</section>
				</form>
			</PageContent>
		</>
	);
};

export default UpdateAccountForUsers;
