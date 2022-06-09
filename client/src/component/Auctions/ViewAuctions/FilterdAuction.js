import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import RadioButton from '../../Register/UI/RadioButtons/RadioButton';

import useHttp from '../../../CustomHooks/useHttp';
import { getAllCategories } from '../../../Api/CategoryApi';

import classes from './ViewAllAuctions.module.css';
import scrollbar from '../../UI/ScrollBar.module.css';
import { useSelector } from 'react-redux';

function FilterdAuctions(props) {
	console.log(props);
	const { sendRequest, data } = useHttp(getAllCategories);
	const idToken = useSelector(store => store.AuthData.idToken);
	// const [filterData ,setFilerData]  = useState()

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);

	const CategoryList = data && data.map(Category => Category.name);

	let AuctionType, AuctionCategory;

	const getAuctionType = value => {
		AuctionType = value;
	};
	const getAuctionCategory = value => {
		AuctionCategory = value;
	};

	const filterAuctionHandler = () => {
		const FilterValues = {
			AuctionType: AuctionType,
			AuctionCategory: AuctionCategory,
		};
		props.filterHandler(FilterValues);
	};

	return (
		<Fragment>
			<div
				className={` ${classes.FilterAuctions} ${
					props.showFilter ? 'd-inline-block' : 'd-none'
				} d-md-inline-block`}
			>
				{props.showFilter && (
					<FontAwesomeIcon
						icon={faFilterCircleXmark}
						className="d-md-none"
						onClick={props.hideFilter}
					/>
				)}

				{/* start filter content */}
				<h4 className="text-center"> Filter Auctions</h4>

				<div className={`${classes.AuctionType} my-4`}>
					<h6>Auction type</h6>
					<RadioButton
						name="AuctionType"
						values={['ongoing', 'upcoming', 'closed']}
						getValue={getAuctionType}
					/>
				</div>

				<div
					className={`${classes.AuctionCategory} ${scrollbar.scrollbar} my-4 mb-5`}
				>
					<h6>Auction Category</h6>
					<RadioButton
						name="AuctionCategory"
						values={CategoryList ? CategoryList : []}
						getValue={getAuctionCategory}
					/>
				</div>

				<button
					className={` ${classes.btnFilter} btn w-100 ${
						props.filter ? 'bg-danger' : ''
					}`}
					onClick={props.filter ? filterAuctionHandler : props.clearFilter}
				>
					{props.filter ? 'Clear Filter' : 'Filter'}
				</button>

				{/* end filter content */}
			</div>
		</Fragment>
	);
}

export default FilterdAuctions;
