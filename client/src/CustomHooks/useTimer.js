import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';

const useTimer = futureDate => {
	const [now, setNow] = useState(new Date());
	const isTimeUp = isBefore(futureDate , now)

	useEffect(() => {
		if(futureDate && isTimeUp){
			const interval = setInterval(() => {
					setNow(new Date());
			}, 1000);
			return () => {
				clearInterval(interval);
			};
		}
		return { days:0 , hours:0 , minutes:0 , seconds:0 }


	}, [futureDate]);


	let { days, hours, minutes, seconds } = intervalToDuration({
		start: now,
		end: futureDate,
	});
	return { days, hours, minutes, seconds };
};

export default useTimer;
