import React, { Fragment } from 'react';

import Header from '../component/HomePage/Header/Header';
import UpComingAuctions from '../component/HomePage/UpComingAuctions/UpComingAuctions';
import OnGoingAuctions from '../component/HomePage/OnGoingAuctions/OnGoingAuctions';
import Footer from '../component/HomePage/Footer/Footer';

<<<<<<< HEAD
import scrollbarStyle from '../component/UI/ScrollBar.module.css';
import HowBid from '../component/HowBid/HowBid';
=======
import scollbarStyle from '../component/UI/ScrollBar.module.css';
>>>>>>> main

const HomePage = () => {
	return (
		<Fragment>
			<div
<<<<<<< HEAD
				className={`${scrollbarStyle.scrollbar} container-fluid px-0`}
=======
				className={`${scollbarStyle.scollbar} container-fluid px-0`}
>>>>>>> main
				style={{ backgroundColor: '#191a19', minHeight: '100vh' }}
			>
				<Header />
				<OnGoingAuctions />
<<<<<<< HEAD
				<HowBid />

=======
>>>>>>> main
				<UpComingAuctions />
				<Footer />
			</div>
		</Fragment>
	);
};

export default HomePage;
