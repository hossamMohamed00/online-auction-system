import React, { useEffect, useState } from 'react';
import buyerImg from '../../../assets/user.png';
import { getProfileData } from '../UserProfile/sellerProfileData';
import useHttp from '../../../CustomHooks/useHttp';
import PageHeader from '../Page Header/pageHeader'

import './PageProfile.css'
import { Link } from 'react-router-dom';

const PageProfile = props => {
	const { data, sendRequest , status } = useHttp(getProfileData);
	const [isWarned , setIsWarned] = useState(false)
	const [isWarnedMessage , setIsWarnedMessage] = useState('')


	useEffect(() => {
		// sendRequest(props.sellerId);
		//TODO: To be updated
		if(props.sellerId){
			console.log(props.sellerId)
			sendRequest(props.sellerId);
		}
	}, [sendRequest , props.sellerId]);

	useEffect(()=>{
		if(status ==='completed'){
			console.log(data)
			setIsWarned(data.seller.isWarned)
			if(data.seller.isWarned){
				setIsWarnedMessage(data.seller.warningMessage)
			}
		}
	},[status])
	return (
		<React.Fragment>
			<PageHeader  text="Seller Profile" showLink ={false} />
			<div className='profilePageContent'>
				<img src={buyerImg} className="userImage"/>
			</div>
			<div className='mt-5'>
				<div className='mb-4'>
					<h4 className='text-light fw-bold ps-3 pe-3 d-inline-block'> Name : </h4>
					<h4 className='text-light d-inline-block'> {data && data.seller.name} </h4>
				</div>
				<div className='mb-4'>
					<h4 className='text-light fw-bold ps-3 pe-3 d-inline-block'> Email : </h4>
					<h4 className='text-light d-inline-block'> {data && data.seller.email} </h4>
				</div>
				{isWarned && isWarnedMessage &&
				<div className='mb-4'>
					<h4 className='text-warning fw-bold ps-3 pe-3 d-inline-block mb-4'>  Warning Message : </h4>
					<h4 className='text-warning d-inline-block fw-bold'>  ⚠️ {isWarnedMessage} </h4>
				</div>
				}
				{data && data.seller.isBlocked &&  data.seller.blockReason &&
				<div className='mb-4'>
					<h4 className='text-light fw-bold ps-3 pe-3 d-inline-block'>  Block Reason : </h4>
					<h4 className='text-danger d-inline-block fw-bold'>  ⛔ {data.seller.blockReason} </h4>
				</div>
				}

			</div>

		</React.Fragment>

	);
};
export default PageProfile;
