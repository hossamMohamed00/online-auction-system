import { intervalToDuration, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';

const useTimer = futureDate => {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		if(futureDate){
			const interval = setInterval(() => {
					setNow(new Date());
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}

	}, [futureDate]);


	let { days, hours, minutes, seconds } = intervalToDuration({
		start: now,
		end: futureDate,
	});
	return { days, hours, minutes, seconds };
};

export default useTimer;
