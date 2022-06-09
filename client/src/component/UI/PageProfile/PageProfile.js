import React, { useEffect, useState } from 'react';
import buyerImg from '../../../assets/user.png';
import { getProfileData } from '../UserProfile/sellerProfileData';
import useHttp from '../../../CustomHooks/useHttp';
import PageHeader from '../Page Header/pageHeader'

import './PageProfile.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const PageProfile = props => {

	localStorage.setItem('id' , props.sellerId)

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
		<div className='position-relative'>
			<PageHeader  text="Seller Profile" showLink ={false} />
			<div className='profilePageContent position-relative'>
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
				<div className='WarningModal'>
					<span className='text-warning fw-bold  d-inline-block'>
						<FontAwesomeIcon icon={faTriangleExclamation} className="warningIcon"/>
					</span>
					<p className='text-warning d-inline-block fw-bold mb-0 p-3'>   {isWarnedMessage} </p>
				</div>
				}
			</div>

			<Link className={`btn bg-danger text-light fw-bold`} to={`/seller-dashboard/UpdateAccount/${props.sellerId}`} > Update Profile </Link>
		</div>

	);
};
export default PageProfile;
