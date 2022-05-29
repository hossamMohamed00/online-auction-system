import React, { Fragment, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import RadioButton from '../../Register/UI/RadioButtons/RadioButton';

import useHttp from '../../../CustomHooks/useHttp';
import { getAllCategories } from '../../../Api/CategoryApi';

import classes from './ViewAllAuctions.module.css';
import { useSelector } from 'react-redux';

function FilterdAuctions(props) {
	const { sendRequest, data } = useHttp(getAllCategories);
	const idToken = useSelector(store => store.AuthData.idToken);

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest]);

	const CategoryList = data && data.map(Category => Category.name);
	console.log('CategoryList', data && CategoryList);

	let AuctionType, AuctionCategory;
	const AuctionMinPriceRef = useRef();
	const AuctionMaxPriceRef = useRef();

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
			AuctionMinPriceRef: AuctionMinPriceRef.current.value,
			AuctionMaxPriceRef: AuctionMaxPriceRef.current.value,
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
						values={['Upgoing', 'Current', 'Closed']}
						getValue={getAuctionType}
					/>
				</div>

				<div className={`${classes.AuctionCategory} my-4`}>
					<h6>Auction Category</h6>
					<RadioButton
						name="AuctionCategory"
						values={CategoryList ? CategoryList : []}
						getValue={getAuctionCategory}
					/>
				</div>

				<div className={`${classes.AuctionPrice} my-4`}>
					<h6>Auction Price </h6>
					<div className="input-group">
						<input
							type="number"
							placeholder="min"
							class="form-control"
							ref={AuctionMinPriceRef}
						/>
						<input
							type="number"
							placeholder="max"
							class="form-control"
							ref={AuctionMaxPriceRef}
						/>
					</div>
				</div>

				<button
					className={` ${classes.btnFilter} btn w-100 `}
					onClick={filterAuctionHandler}
				>
					{' '}
					Filter
				</button>

				{/* end filter content */}
			</div>
		</Fragment>
	);
}

export default FilterdAuctions;
