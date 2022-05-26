import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import useHttp from '../SellerModule';

import classes from './AddNewAuction.module.css';

import Input from '../../../UI/Input/input';

import SellerDashboardContent from '../SellerModule';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';

const AddAuction = () => {
	const PrudectNameRef = useRef();
	const PrudectDescRef = useRef();
	const TitleRef = useRef();

	const [successMessage, setMessage] = useState('');
	const [failedMessage, setFailedMessage] = useState('');
	const idToken = useSelector(store => store.AuthData.idToken);

	const validatePrudectName = value => value !== '';

	const url = 'http://localhost:8000';

	const { sendRequest, status, data, error } = useHttp(SellerDashboardContent);

	const submitHandeler = e => {
		e.preventDefault();
		const userDetails = {
			idToken,
		};
		sendRequest(userDetails);
	};
	return (
		<SellerDashboardContent>
			<PageContent>
				<PageHeader text="Add New Auction" />
				<div>
					<form onSubmit={submitHandeler}>
						<div className="container">
							<div className="row">
								<div className={`${classes.PrdName} col-lg-6`}>
									<label for="Title" className={'text-light fw-bold fs-5 py-2'}>
										Titel
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validatePrudectName}
										ref={TitleRef}
										errorMassage="please enter Prudect Title "
										inputValue=" Title"
										id="Title"
									/>
								</div>
								<div className={`${classes.PrdName} col-lg`}>
									<label
										for="PrudectName"
										className={'text-light fw-bold fs-5 py-2'}
									>
										product Name
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validatePrudectName}
										ref={PrudectNameRef}
										errorMassage="please enter Prudect Name "
										inputValue=" prudect Name"
										id="PrudectName"
									/>
								</div>
							</div>

							<div className="row">
								<div className={`${classes.TextArea} col-lg-6`}>
									<label
										for="prudectDesc"
										className={'text-light fw-bold fs-5 py-2 '}
									>
										Brand Name
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validatePrudectName}
										ref={PrudectDescRef}
										errorMassage="please enter Prudect Describtion "
										inputValue=" prudect Describtion"
										id="prudectDesc"
									/>
								</div>

								<div className={`${classes.SelectStyl} col-lg-6 `}>
									<label className={'text-light fw-bold fs-5 py-2  '}>
										{' '}
										select Category
									</label>
									<select class="form-select " aria-label="">
										<option> one </option>
										<option value="1"> two</option>
									</select>
								</div>
								<div className="row">
									<div className={`col-lg-6`}>
										<label
											for="prudectDesc"
											className={'text-light fw-bold fs-5 py-2 '}
										>
											product short Describtion
										</label>
										<Input
											type="text"
											placeholder=""
											validateText={validatePrudectName}
											ref={PrudectDescRef}
											errorMassage="please enter Prudect Describtion "
											inputValue=" prudect Describtion"
											id="prudectDesc"
										/>
									</div>
									<div className={` col-lg-6`}>
										<label
											for="prudectDelitelDesc"
											className={'text-light fw-bold fs-5 py-2 '}
										>
											product Detiles Describtion
										</label>
										<textarea
											placeholder="type heree..."
											className={`form-control ${classes.ProdulctDetailed}`}
											id="prudectDelitelDesc"
										></textarea>
									</div>
								</div>

								<div className={`row ${classes.SelectStyl}`}>
									<div className="col-lg-6">
										<label className={'text-light fw-bold fs-5 py-2 '}>
											Base Price
										</label>
										<div className={`${classes.TextArea}`}>
											<Input
												type="number"
												placeholder=""
												validateText={validatePrudectName}
												ref={PrudectDescRef}
												errorMassage="please enter Base Price "
												// inputValue=" prudect Describtion"
												id="prudectPrice"
											/>
										</div>
									</div>
									<div className="col-lg-6">
										<label className={'text-light fw-bold fs-5 py-2 '}>
											Select Start Date
										</label>
										<Input
											type="date"
											placeholder=""
											validateText={validatePrudectName}
											ref={PrudectDescRef}
											errorMassage="please enter Start Date "
											id="startDate"
										/>
									</div>
								</div>

								{/* product image */}
								<div className="row">
									<div className="col">
										<label className={'text-light fw-bold fs-5 py-2 '}>
											product Images
										</label>
										<div className={`${classes.TextArea}`}>
											<input
												type="file"
												name="name"
												multiple
												className={`form-control ${classes.productImage}`}
											/>
										</div>
									</div>
								</div>

								<button className={`btn btn-danger ${classes.bntstyl}`}>
									Add Auction
								</button>
							</div>
						</div>
					</form>
				</div>
			</PageContent>
		</SellerDashboardContent>
	);
};

export default AddAuction;
