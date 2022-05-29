import React from 'react';
import useTimer from '../../../CustomHooks/useTimer';

import classes from './CountDownTimer.module.css';

const CountDownTimer = AuctionDate => {
	const getDate = AuctionDate => {
		const timer = useTimer(AuctionDate);
		return (
			<>
				<span> {timer.days} Days </span>
				<span> {timer.hours} h</span>
				<span> {timer.minutes} m</span>
				<span> {timer.seconds} s</span>
			</>
		);
	};

	return <div className={classes.Timer}>{getDate(AuctionDate)}</div>;
};

export default CountDownTimer;
