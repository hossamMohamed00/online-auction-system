import React, { useCallback } from 'react';
import useTimer from '../../../CustomHooks/useTimer';

import classes from './CountDownTimer.module.css';

const CountDownTimer = ({AuctionDate}) => {
	const getDate = useCallback((AuctionDate) => {
		console.log(AuctionDate)
		const timer = useTimer(new Date(AuctionDate));
		return (
			<>
				<span> {timer.days} Days </span>
				<span> {timer.hours} h</span>
				<span> {timer.minutes} m</span>
				<span> {timer.seconds} s</span>
			</>
		);
	},[AuctionDate]);

	return <div className={classes.Timer}>{getDate(AuctionDate)}</div>;
};

export default React.memo(CountDownTimer);
