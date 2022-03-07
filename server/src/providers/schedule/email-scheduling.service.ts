import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class EmailSchedulingService {
	// @Cron('* * * * * *') //* The Cron decorator also accepts a JavaScript Date object.
	@Interval(10000)
	log() {
		console.log('Hello world!');
	}
}

/*
 ┌────────────── second (optional)
 │ ┌──────────── minute
 │ │ ┌────────── hour
 │ │ │ ┌──────── day of the month
 │ │ │ │ ┌────── month
 │ │ │ │ │ ┌──── day of week (0 or 7 are Sunday)
 │ │ │ │ │ │
 │ │ │ │ │ │
 * * * * * *
*/
