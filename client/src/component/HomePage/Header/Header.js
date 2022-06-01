import React, { Fragment, useState } from 'react';
import Navbar from './Navbar';

import classes from './Header.module.css';
import Services from './Services';
import Wallet from '../../Modules/BuyerModule/Payment/Wallet.';

const Header = () => {
	const [showWallet, setShowWallet] = useState(false);

	const showWalletHandler = () => {
		setShowWallet(true);
	};
	return (
		<Fragment>
			<div className="position-relative">
				<Navbar showWalletHandler={showWalletHandler} start='im here' />
				{/* start Header  */}
				<div className={classes.Header}></div>

				{/* start Header content  */}
				<div className={classes.overlay}>
					<div className={classes.HeaderContent}>
						<div>
							<h2 className="fw-bold text-light pt-3 pb-2 fa-1 text-center">
								Best Place TO Bid Or Sell
							</h2>
							<h4
								className={`fw-bold text-light pt-3 pb-2 fa-1 text-center ${classes.moreInfo}`}
							>
								Every Auction comes packed with all the features you need to run
								a live event too
							</h4>
						</div>
					</div>
				</div>
			</div>
			{/* end Header  */}

			{/* start services */}
			<Services />

			{/* wallet */}
			{showWallet && (
				<Wallet show={showWallet} onHide={() => setShowWallet(false)} />
			)}
		</Fragment>
	);
};

export default Header;
