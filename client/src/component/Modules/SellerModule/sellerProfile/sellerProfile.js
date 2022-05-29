import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../../../UI/UserProfile/profile';
import buyerImg from '../../../../assets/user.png';
import { getProfileData } from '../../../UI/UserProfile/sellerDetails';
import useHttp from '../../../../CustomHooks/useHttp';

const SellerProfile = props => {
	console.log('Opening seller profile');
	const { data, status, sendRequest } = useHttp(getProfileData);
	useEffect(() => {
		// sendRequest(props.sellerId);
		//TODO: To be updated
		sendRequest(props.sellerId);
	}, sendRequest);
	console.log(data);


	return (
		<UserProfile
		data={data && data}
			seller={data && data.seller}
			name={data && data.seller.name}
			role={data && data.seller.role}
			auctions={data && data.auctions}
			reviews={data && data.reviews}
			img={buyerImg}

		/>
	);
};
export default SellerProfile;
