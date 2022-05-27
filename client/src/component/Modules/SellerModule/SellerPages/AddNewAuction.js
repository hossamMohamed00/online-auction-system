import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import classes from './AddNewAuction.module.css';
import Input from '../../../UI/Input/input';

import SellerDashboardContent from '../SellerModule';
import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader';
import { AddNewAuctionAPI } from '../../../../Api/SellerApi';
import { getAllCategories } from '../../../../Api/CategoryApi';
import useHttp from '../../../../CustomHooks/useHttp';

import { toast  ,ToastContainer} from 'react-toastify';
import { isBefore } from 'date-fns';
import { now } from 'moment';

const AddAuction = () => {

	const [AddAuction , setAddAuction] = useState('')
	const idToken = useSelector(store => store.AuthData.idToken);

	const { sendRequest : sendRequestCategoryList, status : statusCategoryList, data : dataCategoryList, error : errorCategoryList } = useHttp(getAllCategories);
	const { sendRequest, status , error } = useHttp(AddNewAuctionAPI);

		// get all categories name
		useEffect(()=>{
			sendRequestCategoryList(idToken)
		},[sendRequestCategoryList])


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

	const [CategoryId , setCategoryId] = useState()

	// FirstCategory_id
	const checkCategory =  statusCategoryList==='completed' && dataCategoryList && dataCategoryList.length !== 0

	const [ProductImages , setProductImages] = useState([])
	const [ProductImageErrorMessage , setProductImageErrorMessage] = useState('')


	// start validation
	const validateText = value => value.trim() !== '' && value.trim().length >= 3 ;
	const ValidateDate = value => isBefore(new Date() , new Date(value))

	const ProductImagesHandler = (e) => {
		if(e.target.files.length < 3) {
			setProductImageErrorMessage('Please Select more than three images')
		}
		else{
			const files = e.target.files
			setProductImageErrorMessage('')

			for (const key in files) {
				if (Object.hasOwnProperty.call(files, key)) {
					const image = files[key];
					if(!image.size < 1000000 && !(image.type === 'image/jpg' || image.type === 'image/jpeg' || image.type === 'image/png' )){
						setProductImageErrorMessage('Image Size Must Be Less Than 1000000')
					}
					else{
						setProductImages( (prevState) => [...prevState , image])
					}

				}
			}
		}
	}

	// end validation
		const getAllCategoriesName = checkCategory
			? <select className="form-select" onChange={(e)=> setCategoryId(e.target.value)} >
				<option value="none" selected disabled hidden>Select an category</option>
				{dataCategoryList.map((category)=>(
					<option  key={category._id} value = {category._id}> {category.name} </option>
				))}
			</select>
			: <p className='text-danger'> No Category Now </p>

			const ValidateForm = () => {
				if(validateText(TitleRef.current.value) && validateText(PrudectNameRef.current.value) && validateText(PrudectShortDescRef.current.value)  && validateText(BasePriceRef.current.value)  && ValidateDate(StartDateRef.current.value) ){
					console.log("valid form")
					return true
				}
				else{
					toast.error('Please Fill All Details Required For Adding new Auction ❌ ')
					return;
				}

			}
	const submitHandeler = e => {
		e.preventDefault();
		if(ValidateForm()){
			// const ProductImages = new FormData().append("image" , ImageRef.current.files[0] , ImageRef.current.files[0].name)
			console.log( ProductImages)
			const AuctionDetails = {
				'title' : TitleRef.current.value,
				item : {
					'name' : PrudectNameRef.current.value,
					'shortDescription' : PrudectShortDescRef.current.value,
					'brand' : BrandRef.current.value,
					'detailedDescription' : PrudectDetaildDescRef.current.value ? PrudectDetaildDescRef.current.value : PrudectShortDescRef.current.value ,
					'status' : StatusRef.current.value,
					'image' :  ProductImages
				},
				'startDate' : StartDateRef.current.value,
				'category' : CategoryId,
				'basePrice' : BasePriceRef.current.value
			}
			sendRequest({AuctionDetails , idToken});
			setAddAuction(Math.random())

		}
	};

	useEffect(()=>{
		if(status==='completed'){
			toast.success('Done, new Auction added successfully 💖🐱‍👤');
		}
	},[status , AddAuction])

	useEffect(()=>{
		if(error){
			toast.error(error);
		}
	},[error , AddAuction])



	return (
		<SellerDashboardContent>
			<PageContent>
				<ToastContainer theme="dark" />
				<PageHeader text="Add New Auction" />
				<div>
					<form onSubmit={submitHandeler}>
						<div className="container">
							<div className="row">
								{/* start Product Title */}
								<div className={`col-lg-6 `}>
									<label htmlFor="Title" className={'text-light fw-bold fs-6 py-2'}>
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

							<div className= {` row ${classes.SelectStyl}`} >
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
											onChange = {ProductImagesHandler}
										/>
										{ProductImageErrorMessage && <p className='text-danger'> {ProductImageErrorMessage} </p> }

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
