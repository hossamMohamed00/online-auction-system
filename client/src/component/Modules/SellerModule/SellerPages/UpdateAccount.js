import React, { useRef, useState } from 'react';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import SellerDashboardContent from '../SellerModule';
import userImg from '../../../../assets/user.png';
import classes from './UpdateAccount.module.css';
import Input from '../../../UI/Input/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';

const UpdateAccount = () => {
	const TextRef = useRef();
	const textRef = useRef();
	const validateText = value => value !== '';
	const ImageRef = useRef();

	const ChangeImageHandler = e => {
		ImageRef.current.click();
	};
	//const ImageHandler

	return (
		<>
			<SellerDashboardContent>
				<PageContent className={classes.PageContentStyle}>
					<PageHeader text="Edit Your Account" />
					<div className="container-fluid">
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
									<label>E-mail : Shrouk@gmail.com </label>
								</div>
								<div className={'col-6 text-light fw-bold fs-5 py-2 '}>
									<label> Type : Seller</label>
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
										ref={textRef}
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
										ref={TextRef}
										errorMassage="please enter your Address "
										inputValue=" prudect Name"
										id="PhoneNumber "
									/>
								</div>
							</div>

							{/* National Number And Address */}
							<div className="row">
								<div className={`col-lg-6`}>
									<label
										for="NationalNumber"
										className={'text-light fw-bold fs-5 py-2'}
									>
										National Number
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={textRef}
										errorMassage="please enter 	Your Number "
										inputValue=" Phone"
										id="NationalNumber"
									/>
								</div>
								<div className={`col-lg`}>
									<label
										for="Address"
										className={'text-light fw-bold fs-5 py-2'}
									>
										Address
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={TextRef}
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
										ref={textRef}
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
										ref={TextRef}
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
										ref={textRef}
										errorMassage="please enter 	Your New Password "
										inputValue=" Phone"
										id="NewPassword"
									/>
								</div>
								<div className={`col-lg`}>
									<label
										for="Confirm"
										className={'text-light fw-bold fs-5 py-2'}
									>
										Confirm New Password
									</label>
									<Input
										type="password"
										placeholder=""
										validateText={validateText}
										ref={TextRef}
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
					</div>
				</PageContent>
			</SellerDashboardContent>
		</>
	);
};

export default UpdateAccount;
