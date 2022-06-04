import React, { useEffect, useRef, useState } from 'react';
import SellerDashboardContent from '../SellerModule';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';

import classes from './UpdateAuction.module.css';
import Input from '../../../UI/Input/input';

import { toast, ToastContainer } from 'react-toastify';
import { isBefore } from 'date-fns';

const UpdateAuction = () => {
	// start validation
	const validateText = value => value.trim() !== '' && value.trim().length >= 3;
	const ValidateDate = value => isBefore(new Date(), new Date(value));

	// get all categories name

	// start refs
	const TitleRef = useRef();
	const PrudectNameRef = useRef();
	const BrandRef = useRef();
	const StatusRef = useRef();
	const BasePriceRef = useRef();
	const StartDateRef = useRef();
	const PrudectShortDescRef = useRef();
	const PrudectDetaildDescRef = useRef();
	// end refs
	const submitHandeler = e => {
		e.preventDefault();
	};
	/*if (ValidateForm()) {
			// const ProductImages = new FormData().append("image" , ImageRef.current.files[0] , ImageRef.current.files[0].name)
			console.log(ProductImages);
		}*/

	return (
		<SellerDashboardContent>
			<PageContent>
				<ToastContainer theme="dark" />
				<PageHeader text="Edit Auction" />
				<div>
					<form onSubmit={submitHandeler}>
						<div className="container">
							<div className="row">
								{/* start Product Title */}
								<div className={`col-lg-6 `}>
									<label
										htmlFor="Title"
										className={'text-light fw-bold fs-6 py-2'}
									>
										Titel
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={TitleRef}
										errorMassage="please enter Prudect Title "
										inputValue=" Title"
										id="Title"
									/>
								</div>

								{/* start Product Name */}
								<div className={`col-lg`}>
									<label
										htmlFor="PrudectName"
										className={'text-light fw-bold fs-6 py-2'}
									>
										product Name
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={PrudectNameRef}
										errorMassage="please enter Prudect Name "
										inputValue=" prudect Name"
										id="PrudectName"
									/>
								</div>
							</div>

							<div className={` row ${classes.SelectStyl}`}>
								{/* start Brand Name */}
								<div className={`${classes.TextArea} col-lg-6`}>
									<label
										htmlFor="Brand"
										className={'text-light fw-bold fs-6 py-2 '}
									>
										Brand Name
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={BrandRef}
										errorMassage="please enter Prudect Describtion "
										inputValue=" prudect Describtion"
										id="Brand"
									/>
								</div>

								{/* start select Category Name */}
								<div className={`col-lg-6 `}>
									<label className={'text-light fw-bold fs-6 py-2  '}>
										select Category
									</label>
								</div>
							</div>

							<div className={`row ${classes.SelectStyl}`}>
								{/* start base price */}
								<div className="col-lg-6">
									<label className={'text-light fw-bold fs-6 py-2 '}>
										Base Price
									</label>
									<Input
										type="number"
										placeholder=""
										validateText={validateText}
										ref={BasePriceRef}
										errorMassage="please enter Base Price "
										inputValue=" prudect Describtion"
										id="prudectPrice"
									/>
								</div>

								{/* start [start date] */}
								<div className="col-lg-6">
									<label className={'text-light fw-bold fs-6 py-2 '}>
										Select Start Date
									</label>
									<Input
										type="date"
										placeholder=""
										validateText={ValidateDate}
										ref={StartDateRef}
										errorMassage="please enter valid date  "
										id="startDate"
									/>
								</div>
							</div>

							<div className="row">
								{/* start short desc */}
								<div className={`col-lg-6`}>
									<label
										htmlFor="prudectDesc"
										className={'text-light fw-bold fs-6 py-2 '}
									>
										product short Describtion
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={PrudectShortDescRef}
										errorMassage="please enter Prudect Describtion "
										inputValue=" prudect Describtion"
										id="prudectDesc"
									/>
								</div>

								{/* start detaild desc */}
								<div className={`col-lg-6`}>
									<label
										htmlFor="prudectDelitelDesc"
										className={'text-light fw-bold fs-6 py-2 '}
									>
										product Detiles Describtion
									</label>
									<textarea
										placeholder="type heree..."
										className={`form-control ${classes.ProdulctDetailed}`}
										id="prudectDelitelDesc"
										ref={PrudectDetaildDescRef}
									></textarea>
								</div>
							</div>

							<div className="row">
								{/* product status */}
								<div className={`${classes.TextArea} col-lg-6`}>
									<label
										htmlFor="Status"
										className={'text-light fw-bold fs-6 py-2 '}
									>
										Status
									</label>
									<Input
										type="text"
										placeholder=""
										validateText={validateText}
										ref={StatusRef}
										errorMassage="please enter status of item "
										inputValue=""
										id="Status"
									/>
								</div>
								{/* product image */}
								<div className="col-6">
									<label className={'text-light fw-bold fs-6 py-2 '}>
										product Images
									</label>
									<input
										type="file"
										name="name"
										multiple
										className={`form-control ${classes.productImage}`}
										// ref={ImageRef}
									/>
								</div>
							</div>

							<button className={`btn btn-danger ${classes.bntstyl}`}>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</PageContent>
		</SellerDashboardContent>
	);
};

export default UpdateAuction;
