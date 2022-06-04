import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import SellerDashboardContent from '../SellerModule';

import UpdateAccountForUsers from './../../../UI/UpdateAccount/UpdateAccount';

const UpdateAccountForSeller = () => {

	const role = useSelector(store => store.AuthData.role);
	const email = useSelector(store => store.AuthData.email);
	const TextRef = useRef();
	const textRef = useRef();
	const validateText = value => value !== '';
	const ImageRef = useRef();
	const [newImage, setNewImage] = useState(null);

	const ChangeImageHandler = e => {
		ImageRef.current.click();
	};

	return (
		<>
			<SellerDashboardContent>
				<UpdateAccountForUsers />
			</SellerDashboardContent>
		</>
	);
};

export default UpdateAccountForSeller;
