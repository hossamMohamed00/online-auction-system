import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import useHttp from '../SellerModule';

import classes from './AddNewAuction.module.css';
import Input from '../../../UI/Input/input';

import SellerDashboardContent from '../SellerModule';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import { AddNewAuctionAPI } from '../../../../Api/SellerApi';
import { getAllCategories } from '../../../../Api/CategoryApi';

const AddAuction = () => {

	const idToken = useSelector(store => store.AuthData.idToken);
	const { sendRequest, status, data, error } = useHttp(AddNewAuctionAPI);
	const { sendRequest:sendRequestCategoryList,
					status : statusCategoryList,
					data : dataCategoryList,
					error : errorCategoryList
				} = useHttp(getAllCategories);


	// start refs
	const TitleRef = useRef();
	const PrudectNameRef = useRef();
	const BrandRef = useRef();
	const CategoryNameRef = useRef();
	const BasePriceRef = useRef();
	const StartDateRef = useRef();
	const PrudectShortDescRef = useRef();
	const PrudectDetaildDescRef = useRef();

	// end refs

	// start validation
	const validateText = value => value !== '';
	// const ValidateDate = '';

	// end validation

	// get all categories name
	useEffect(()=>{
		sendRequestCategoryList(idToken)
	},[sendRequestCategoryList])

	const getAllCategoriesName = statusCategoryList ==='completed' && (dataCategoryList && dataCategoryList.length > 0)
		? dataCategoryList.map((category)=>{
			return <option value={category.name} key={category.id}> {category.name} </option>
			})
		: <p> No Category Now </p>


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
								{/* start Product Title */}
								<div className={`${classes.PrdName} col-lg-6 `}>
									<label for="Title" className={'text-light fw-bold fs-6 py-2'}>
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
								<div className={`${classes.PrdName} col-lg`}>
									<label
										for="PrudectName"
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

							<div className= {` row ${classes.SelectStyl}`} >
								{/* start Brand Name */}
								<div className={`${classes.TextArea} col-lg-6`}>
									<label
										for="Brand"
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
									<select class="form-select" >
										{getAllCategoriesName}
									</select>
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
											validateText={validateText}
											ref={StartDateRef}
											errorMassage="please enter Start Date "
											id="startDate"
										/>
								</div>
							</div>

							<div className="row">
								{/* start short desc */}
								<div className={`col-lg-6`}>
										<label
											for="prudectDesc"
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
											for="prudectDelitelDesc"
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

							{/* product image */}
							<div className="row">
									<div className="col-6">
										<label className={'text-light fw-bold fs-6 py-2 '}>
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
					</form>
				</div>
			</PageContent>
		</SellerDashboardContent>
	);
};

export default AddAuction;
