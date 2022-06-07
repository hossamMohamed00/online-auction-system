import React, { useEffect, useRef, useState } from 'react';
import SellerDashboardContent from '../SellerModule';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import { getAllCategories } from '../../../../Api/CategoryApi';
import { UpdateAuctionHandler } from '../../../../Api/AuctionsApi';
import classes from './UpdateAuction.module.css';
import Input from '../../../UI/Input/input';

import { toast, ToastContainer } from 'react-toastify';
import { isBefore } from 'date-fns';
import useHttp from './../../../../CustomHooks/useHttp';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const UpdateAuction = () => {
	const location = useLocation();
	const AuctionId = new URLSearchParams(location.search).get('id');
	// start validation
	const validateText = value => value.trim() !== '' && value.trim().length >= 3;
	const ValidateDate = value => isBefore(new Date(), new Date(value));

	const idToken = useSelector(store => store.AuthData.idToken);

	const {
		sendRequest: sendRequestUpdateAuction,
		status: statusUpdateAuction,
		data: dataUpdateAuction,
		error: errorUpdateAuction,
	} = useHttp(UpdateAuctionHandler);
	// get all categories name
	const [CategoryId, setCategoryId] = useState();

	const {
		sendRequest: sendRequestCategoryList,
		status: statusCategoryList,
		data: dataCategoryList,
	} = useHttp(getAllCategories);
	useEffect(() => {
		sendRequestCategoryList(idToken);
	}, [sendRequestCategoryList]);

	const checkCategory =
		statusCategoryList === 'completed' &&
		dataCategoryList &&
		dataCategoryList.length !== 0;

	const getAllCategoriesName = checkCategory ? (
		<select
			className="form-select"
			onChange={e => setCategoryId(e.target.value)}
		>
			<option value="none" selected disabled>
				Select an category
			</option>
			{dataCategoryList.map(category => (
				<option key={category._id} value={category._id}>
					{' '}
					{category.name}{' '}
				</option>
			))}
		</select>
	) : (
		<p className="text-danger"> No Category Now </p>
	);

	// start refs
	const TitleRef = useRef();
	const ProductNameRef = useRef();
	// const BrandRef = useRef();
	const StatusRef = useRef();
	const BasePriceRef = useRef();
	// const ProductShortDescRef = useRef();
	// const ProductDetaildDescRef = useRef();
	// // end refs
	const submitHandeler = e => {
		e.preventDefault();
		const auctionData = {
			title: TitleRef.current.value,
			item: {
				_id: AuctionId,
				name: ProductNameRef.current.value,
			},
			basePrice: BasePriceRef.current.value,
			category: CategoryId,
		};
		sendRequestUpdateAuction({
			AuctionId: AuctionId,
			auctionData: auctionData,
			idToken: idToken,
		});
	};
	useEffect(() => {
		if (statusUpdateAuction === 'completed') {
			toast.success('Auction Updated Successfully');
		} else {
			toast.error(errorUpdateAuction);
		}
	}, [statusUpdateAuction, errorUpdateAuction]);
	/*if (ValidateForm()) {
			// const ProductImages = new FormData().append("image" , ImageRef.current.files[0] , ImageRef.current.files[0].name)
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
										ref={ProductNameRef}
										errorMassage="please enter Prudect Name "
										inputValue=" prudect Name"
										id="PrudectName"
									/>
								</div>
							</div>

							<div className={` row ${classes.SelectStyl}`}>
								{/* start Brand Name */}
								{/* <div className={`${classes.TextArea} col-lg-6`}>
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
								</div> */}

								{/* start select Category Name */}
								<div className={`col-lg-6 `}>
									<label className={'text-light fw-bold fs-6 py-2  '}>
										select Category
									</label>
									{getAllCategoriesName}
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
								<div className={`${classes.TextArea} col-lg-6`}>
									<label
										htmlFor="Status"
										className={'text-light fw-bold fs-6 py-2 '}
									>
										Item Status
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
							</div>

							{/* <div className="row">
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
										ref={ProductShortDescRef}
										errorMassage="please enter Prudect Describtion "
										inputValue=" prudect Describtion"
										id="prudectDesc"
									/>
								</div> */}

							{/* start detaild desc */}
							{/* <div className={`col-lg-6`}>
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
										ref={ProductDetaildDescRef}
									></textarea>
								</div>
							</div> */}

							<div className="row">
								{/* product status */}

								{/* product image */}
								{/* <div className="col-6">
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
								</div> */}
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
